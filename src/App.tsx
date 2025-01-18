import {useEffect, useState} from "react";
import {Flex} from 'antd';

import {Header} from "./components/header/Header.tsx";
// import {SelectTeams} from "./components/select-teams/SelectTeams.tsx";
import {FixturesList} from "./components/fixtures/FixturesList.tsx";
// import {ChooseCompetitions} from "./components/choose-competitions/ChooseCompetitions.tsx";

import "./App.css";

import type {Fixture, Team} from "./types/types.ts";
import {getAllFixtures, getTeamsList} from "./api";

function App() {
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [teamsList, setTeamsList] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [limit, setLimit] = useState<number>(5);
    const [competitions, setCompetitions] = useState<string | string[]>(["PL"]);

    useEffect(() => {
        const fetchTeamsList = async () => {
            try {
                const data: Team[] = await getTeamsList();
                setTeamsList(data);
            } catch (err: unknown) {
                console.log(err);
                setError(err as Error);
            }
        }

        fetchTeamsList();
    }, [])

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
            try {
                const fixtures: Fixture[] = await getAllFixtures(selectedTeams, limit, competitions);
                setFixtures(fixtures);
            } catch (err: unknown) {
                console.log(err);
                setError(err as Error);
            }
        }

        fetchFixtures();
    }, [selectedTeams, limit, competitions]);

    // const handleTeamSelect = (value: number[]) => {
    //     setSelectedTeams(value);
    //     localStorage.setItem("selectedTeams", JSON.stringify(value));
    // }

    if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <Flex gap="middle" vertical>
            <Header/>
            {/*<ChooseCompetitions onChange={setCompetitions}/>*/}
            {/*<SelectTeams teams={teamsList} selectedTeams={selectedTeams} onTeamSelect={handleTeamSelect}/>*/}
            {fixtures.length > 0 && <FixturesList fixtures={fixtures} teamsList={teamsList}/>}
        </Flex>
    )
}

export default App
