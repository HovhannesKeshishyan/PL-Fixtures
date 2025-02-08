"use client"
import Cookies from 'js-cookie';
import {useState} from "react";
import {Flex} from "antd";
import type {Team} from "@/types/types";
import {SelectTeams} from "@/app/components/select-teams/SelectTeams";
import {FixturesList} from "@/app/components/fixtures-list/FixturesList";

interface Props {
    teamsList: Team[];
    selectedTeamIds: number[];
}

function PlFixtures({teamsList, selectedTeamIds}: Props) {
    const [selectedTeams, setSelectedTeams] = useState<number[]>(selectedTeamIds);
    const [limit] = useState<number>(5);
    const [competitions] = useState<string | string[]>(["PL"]);

    const handleTeamSelect = (value: number[]) => {
        setSelectedTeams(value);
        Cookies.set("selectedTeams", JSON.stringify(value));
    }

    return (
        <Flex vertical gap="large">
            <SelectTeams teams={teamsList} selectedTeams={selectedTeams}
                         onTeamSelect={handleTeamSelect}/>
            <FixturesList teamsList={teamsList} competitions={competitions} limit={limit}
                          selectedTeams={selectedTeams}/>
        </Flex>
    )
}

export default PlFixtures;
