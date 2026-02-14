import {type FC, useEffect, useMemo, useState} from "react";
import {Flex, Alert} from "antd";

import {FixturesListItem} from "./item/FixturesListItem";
import {getAllFixtures} from "@/services";

import type {Fixture, FixturesLimit, Match, Prediction, Team} from "@/types/types.ts";

import styles from "./Fixtures.module.scss";

interface Props {
    teamsList: Team[];
    limit: FixturesLimit;
    selectedTeams: number[];
}

interface CachedFixtures {
    [key: string]: Fixture;
}

export const FixturesList: FC<Props> = ({teamsList, limit, selectedTeams}) => {
    const [cachedFixtures, setCachedFixtures] = useState<CachedFixtures>({});
    const [limitLastValue, setLimitLastValue] = useState<FixturesLimit>(limit);
    const [error, setError] = useState<null | Error>(null);

    // when new team is selected, and there is no cached data
    const newAddedTeams: number[] = useMemo(() => {
        return selectedTeams.filter(teamId => !cachedFixtures[teamId])
    }, [cachedFixtures, selectedTeams])

    const limitIsChanged = limit !== limitLastValue;

    const needFetchAgain = !!newAddedTeams.length || limitIsChanged;

    const addNewPrediction = (prediction: Prediction, matchUUID: string) => {
        // matchUUID is created from match.id, homeTeam.id awayTeam.id
        const [, homeTeamID, awayTeamID] = matchUUID.split("-");

        const updatedData = {...cachedFixtures};

        // when get prediction for match of one team and opponent
        // fixtures are also in the screen
        // this is to update both
        const relatedMatches: Match[] = [];

        [homeTeamID, awayTeamID].forEach(id => {
            if(updatedData[id]) relatedMatches.push(...updatedData[id].matches);
        })

        relatedMatches.forEach(match => {
            if (match.uuid === matchUUID) {
                match.aiPrediction = prediction;
            }
        })

        setCachedFixtures(updatedData);
    }

    useEffect(() => {
        if (!selectedTeams.length) return;

        const fetchFixtures = async () => {
            try {
                const data: Fixture[] = await getAllFixtures({ids: selectedTeams, limit});
                const newValue: CachedFixtures = {}
                data.forEach(item => {
                    newValue[item.teamId] = item;
                })
                setCachedFixtures(newValue);
                setLimitLastValue(limit);
            } catch (err: unknown) {
                console.log(err);
                setError(err as Error);
            }
        }

        // fetch only if new team is selected
        if (needFetchAgain) fetchFixtures();
    }, [needFetchAgain, selectedTeams, limit]);

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (!selectedTeams?.length) {
        return (
            <div className={styles.emptyResultsWrapper} data-testid="empty-teams-list-alert">
                <Alert title="Please select team to see fixtures" type="warning" showIcon/>
            </div>
        )
    }

    return (
        <div className={styles.fixtures}>
            <Flex gap="large" justify="center" wrap>
                {selectedTeams.map(teamId => {
                    const teamName = teamsList.find(team => team.id === teamId)?.name || "";
                    const fixture = cachedFixtures[teamId];

                    return <FixturesListItem fixture={fixture}
                                             teamName={teamName}
                                             isLoading={!cachedFixtures[teamId]}
                                             onNewPredictionAction={addNewPrediction}
                                             key={teamId}/>
                })}
            </Flex>
        </div>
    );
}