import {FC, useEffect, useState} from "react";
import {LoadingOutlined} from '@ant-design/icons';
import {Flex, Spin} from 'antd';
import {FixturesListItem} from "../fixtures-list-item/FixturesListItem.tsx";
import {getAllFixtures} from "../../api";
import type {Fixture, Team} from "../../types/types.ts";
import styles from "./Fixtures.module.scss";

interface Props {
    teamsList: Team[];
    limit: number;
    competitions: string | string[];
}

export const FixturesList: FC<Props> = ({teamsList, limit, competitions}) => {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        const selectedTeamsFromStorage = localStorage.getItem("selectedTeams");
        let selectedTeamsIds: number[] = [];

        if (selectedTeamsFromStorage) {
            try {
                selectedTeamsIds = JSON.parse(selectedTeamsFromStorage);
            } catch (err: unknown) {
                console.log(err);
            }
        }

        selectedTeamsIds = selectedTeamsIds.filter(teamId => {
            return teamsList.some(item => item.id === teamId);
        });
        if (selectedTeamsIds.length) {
            setSelectedTeams(selectedTeamsIds);
        } else {
            setSelectedTeams([64, 57, 65]); // Default
        }
    }, [teamsList]);

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