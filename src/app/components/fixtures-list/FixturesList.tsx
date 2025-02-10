import {FC, useEffect, useMemo, useState} from "react";
import {Flex, Alert} from 'antd';
import {FixturesListItem} from "@/app/components/fixtures-list-item/FixturesListItem";
import {getAllFixtures} from "@/services";
import type {Fixture, FixturesLimit, Team} from "@/types/types.ts";
import styles from "./Fixtures.module.scss";

interface Props {
    teamsList: Team[];
    limit: FixturesLimit;
    competitions: string | string[];
    selectedTeams: number[];
}

interface CachedFixtures {
    [key: string]: Fixture;
}

export const FixturesList: FC<Props> = ({teamsList, limit, competitions, selectedTeams}) => {
    const [cachedFixtures, setCachedFixtures] = useState<CachedFixtures>({});
    const [limitLastValue, setLimitLastValue] = useState<FixturesLimit>(limit);
    const [error, setError] = useState<null | Error>(null);

    // when new team is selected, and there is no cached data
    const newAddedTeams: number[] = useMemo(() => {
        return selectedTeams.filter(teamId => !cachedFixtures[teamId])
    }, [cachedFixtures, selectedTeams])

    const limitIsChanged = limit !== limitLastValue;

    const needFetchAgain = !!newAddedTeams.length || limitIsChanged;

    useEffect(() => {
        if (!selectedTeams.length) return;

        const fetchFixtures = async () => {
            try {
                const data: Fixture[] = await getAllFixtures(selectedTeams, limit, competitions);
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
    }, [needFetchAgain, selectedTeams, limit, competitions]);

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (!selectedTeams?.length) {
        return(
            <div className={styles.emptyResultsWrapper}>
                <Alert message="Please select team to see fixtures" type="warning" showIcon/>
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
                                             key={teamId}/>
                })}
            </Flex>
        </div>
    );
}