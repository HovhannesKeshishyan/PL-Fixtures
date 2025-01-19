import {useEffect, useState} from "react";
import {Flex} from 'antd';

import {Header} from "./components/header/Header.tsx";
// import {SelectTeams} from "./components/select-teams/SelectTeams.tsx";
import {FixturesList} from "./components/fixtures-list/FixturesList.tsx";
// import {ChooseCompetitions} from "./components/choose-competitions/ChooseCompetitions.tsx";

import "./App.css";

import type {Team} from "./types/types.ts";
import {getTeamsList} from "./api";
import {Loading} from "./components/loading/Loading.tsx";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [teamsList, setTeamsList] = useState<Team[]>([]);
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

    // const handleTeamSelect = (value: number[]) => {
    //     setSelectedTeams(value);
    //     localStorage.setItem("selectedTeams", JSON.stringify(value));
    // }

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (loading) {
        return <Loading/>

    }

    return (
        <Flex gap="middle" vertical>
            <Header/>
            {/*<ChooseCompetitions onChange={setCompetitions}/>*/}
            {/*<SelectTeams teams={teamsList} selectedTeams={selectedTeams} onTeamSelect={handleTeamSelect}/>*/}
            <FixturesList teamsList={teamsList} competitions={competitions} limit={limit}/>
        </Flex>
    )
}

export default App
