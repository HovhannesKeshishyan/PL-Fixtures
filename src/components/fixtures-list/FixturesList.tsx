import {FC, useEffect, useState} from "react";
import {LoadingOutlined} from '@ant-design/icons';
import {Flex, Spin, Alert} from 'antd';
import {FixturesListItem} from "../fixtures-list-item/FixturesListItem.tsx";
import {getAllFixtures} from "../../api";
import type {Fixture, Team} from "../../types/types.ts";
import styles from "./Fixtures.module.scss";

interface Props {
    teamsList: Team[];
    limit: number;
    competitions: string | string[];
    selectedTeams: number[];
}

export const FixturesList: FC<Props> = ({teamsList, limit, competitions, selectedTeams}) => {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        if (!selectedTeams.length) return;

        const fetchFixtures = async () => {
            setLoading(true);
            try {
                const fixtures: Fixture[] = await getAllFixtures(selectedTeams, limit, competitions);
                setFixtures(fixtures);
            } catch (err: unknown) {
                console.log(err);
                setError(err as Error);
            }
            setLoading(false);
        }

        fetchFixtures();
    }, [selectedTeams, limit, competitions]);

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (loading) {
        return (
            <Flex align="center" justify="center" gap="100px">
                {Array.from({length: selectedTeams.length}).map((_, index) => {
                    return <Spin indicator={<LoadingOutlined spin/>} size="large" key={index}/>
                })}
            </Flex>
        )
    }

    if (!selectedTeams?.length) {
        return <Alert message="Please select team to see fixtures" type="warning" showIcon/>
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