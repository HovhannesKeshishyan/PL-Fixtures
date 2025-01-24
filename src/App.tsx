import {useEffect, useState} from "react";
import {Flex} from "antd";

import {MainLayout} from "./layouts/MainLayout.tsx";

import {Header} from "./components/header/Header.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import {Loading} from "./components/loading/Loading.tsx";
import {SelectTeams} from "./components/select-teams/SelectTeams.tsx";
import {FixturesList} from "./components/fixtures-list/FixturesList.tsx";
// import {ChooseCompetitions} from "./components/choose-competitions/ChooseCompetitions.tsx";

import "./App.scss";

import type {Team} from "./types/types.ts";
import {getTeamsList} from "./api";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [teamsList, setTeamsList] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
    const [limit] = useState<number>(5);
    const [competitions] = useState<string | string[]>(["PL"]);

    useEffect(() => {
        const fetchTeamsList = async () => {
            setLoading(true);
            try {
                const data: Team[] = await getTeamsList();
                setTeamsList(data);
            } catch (err: unknown) {
                console.log(err);
                setError(err as Error);
            }
            setLoading(false);
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
        }
    }, [teamsList]);

    const handleTeamSelect = (value: number[]) => {
        setSelectedTeams(value);
        localStorage.setItem("selectedTeams", JSON.stringify(value));
    }

    if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <MainLayout>
            <Header/>

            <Flex vertical gap="large">
                {/*<ChooseCompetitions onChange={setCompetitions}/>*/}
                <SelectTeams teams={teamsList} loading={loading} selectedTeams={selectedTeams}
                             onTeamSelect={handleTeamSelect}/>
                {loading ? <Loading/> : <FixturesList teamsList={teamsList} competitions={competitions} limit={limit}
                                                      selectedTeams={selectedTeams}/>}
            </Flex>

            <Footer/>
        </MainLayout>
    )
}

export default App
