import {type FC} from "react";
import {Flex, Alert} from "antd";

import {FixturesListItem} from "./item/FixturesListItem";
import {useFixtures} from "../model/useFixtures";

import type {FixturesLimit, Team} from "@/shared/types";

import styles from "./Fixtures.module.scss";

interface Props {
    teamsList: Team[];
    limit: FixturesLimit;
    selectedTeams: number[];
}

export const FixturesList: FC<Props> = ({teamsList, limit, selectedTeams}) => {
    const {cachedFixtures, error, addNewPrediction} = useFixtures(selectedTeams, limit);

    if (error) return <h1>{error.message}</h1>;

    if (!selectedTeams?.length) {
        return (
            <div className={styles.emptyResultsWrapper} data-testid="empty-teams-list-alert">
                <Alert title="Please select team to see fixtures" type="warning" showIcon/>
            </div>
        );
    }

    return (
        <div className={styles.fixtures}>
            <Flex gap="large" justify="center" wrap>
                {selectedTeams.map(teamId => {
                    const teamName = teamsList.find(team => team.id === teamId)?.name || "";
                    const fixture = cachedFixtures[teamId];

                    return (
                        <FixturesListItem
                            fixture={fixture}
                            teamName={teamName}
                            isLoading={!cachedFixtures[teamId]}
                            onNewPredictionAction={addNewPrediction}
                            key={teamId}
                        />
                    );
                })}
            </Flex>
        </div>
    );
};