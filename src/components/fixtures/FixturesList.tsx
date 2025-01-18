import {FC} from "react";
import styles from "./Fixtures.module.scss";
import {Flex} from "antd";
import type {Fixture, Team} from "../../types/types.ts";
import {FixturesListItem} from "../fixtures-list-item/FixturesListItem.tsx";

interface Props {
    fixtures: Fixture[];
    teamsList: Team[];
}

export const FixturesList: FC<Props> = ({fixtures, teamsList}) => {
    return (
        <div className={styles.fixtures}>
            <Flex gap="middle" justify="center" wrap>
                {fixtures.map(fixture => {
                    const teamName = teamsList.find(team => team.id === fixture.teamId)?.name!;

                    return <FixturesListItem fixture={fixture} teamName={teamName} key={fixture.teamId}/>
                })}
            </Flex>
        </div>
    );
}