"use client"
import Cookies from 'js-cookie';
import {useState} from "react";
import {Flex} from "antd";
import type {FixturesLimit, Team} from "@/types/types";
import {SelectTeams} from "@/app/components/select-teams/SelectTeams";
import {FixturesList} from "@/app/components/fixtures-list/FixturesList";
import {SelectLimit} from "@/app/components/select-limit/SelectLimit";

interface Props {
    teamsList: Team[];
    selectedTeamIds: number[];
    limit: FixturesLimit;
}

function PlFixtures({teamsList, selectedTeamIds, limit}: Props) {
    const [selectedTeams, setSelectedTeams] = useState<number[]>(selectedTeamIds);
    const [fixturesLimit, setFixturesLimit] = useState<FixturesLimit>(limit);
    const [competitions] = useState<string | string[]>(["PL"]);

    const handleTeamSelect = (value: number[]) => {
        setSelectedTeams(value);
        Cookies.set("selectedTeams", JSON.stringify(value));
    }

    const handleLimitChange = (value: FixturesLimit) => {
        setFixturesLimit(value);
        Cookies.set("limit", value + "");
    }

    return (
        <Flex vertical gap="large">
            <Flex gap={10} vertical>
                <SelectTeams teams={teamsList} selectedTeams={selectedTeams}
                             onTeamSelect={handleTeamSelect}/>
                <SelectLimit limit={fixturesLimit} onLimitChange={handleLimitChange}/>
            </Flex>
            <FixturesList teamsList={teamsList} competitions={competitions} limit={fixturesLimit}
                          selectedTeams={selectedTeams}/>
        </Flex>
    )
}

export default PlFixtures;
