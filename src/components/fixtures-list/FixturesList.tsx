import {FC} from "react";
import styles from "./Fixtures.module.scss";
import {LoadingOutlined} from '@ant-design/icons';
import {Flex, Spin} from 'antd';
import type {Fixture, Team} from "../../types/types.ts";
import {FixturesListItem} from "../fixtures-list-item/FixturesListItem.tsx";

interface Props {
    fixtures: Fixture[];
    teamsList: Team[];
    loading: boolean;
    itemsCount: number;
}

export const FixturesList: FC<Props> = ({fixtures, teamsList, loading, itemsCount}) => {
    if (loading) {
        return (
            <Flex align="center" justify="center" gap="100px">
                {Array.from({length: itemsCount}).map((_, index) => {
                    return <Spin indicator={<LoadingOutlined spin/>} size="large" key={index}/>
                })}
            </Flex>
        )
    }
    return (
        <div className={styles.fixtures}>
            <Flex gap="middle" justify="center" wrap>
                {fixtures.map(fixture => {
                    const teamName = teamsList.find(team => team.id === fixture.teamId)?.name || "";

                    return <FixturesListItem fixture={fixture} teamName={teamName} key={fixture.teamId}/>
                })}
            </Flex>
        </div>
    );
}