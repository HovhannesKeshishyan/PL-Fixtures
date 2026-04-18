"use client"

import {useState} from "react";
import {Flex} from "antd";

import Cookies from "js-cookie";

import {FixturesList} from "@/entities/fixture";
import {SelectTeams} from "@/features/select-teams";
import {SelectLimit} from "@/features/select-limit";

import type {FixturesLimit, Team} from "@/shared/types";

interface Props {
    teamsList: Team[];
    selectedTeamIds: number[];
    limit: FixturesLimit;
}

export const PlFixtures = ({teamsList, selectedTeamIds, limit}: Props) => {
    const [selectedTeams, setSelectedTeams] = useState<number[]>(selectedTeamIds);
    const [fixturesLimit, setFixturesLimit] = useState<FixturesLimit>(limit);

    const cookiesAccepted = () => {
        return Cookies.get("cookiesAccepted") === "true";
    }

    const handleTeamSelect = (value: number[]) => {
        setSelectedTeams(value);
        if (cookiesAccepted()) {
            Cookies.set("selectedTeams", JSON.stringify(value), {expires: 365});
        }
    }

    const handleLimitChange = (value: FixturesLimit) => {
        setFixturesLimit(value);
        if (cookiesAccepted()) {
            Cookies.set("limit", value + "");
        }
    }

    return (
        <Flex vertical gap="large">
            <Flex gap={10} vertical>
                <SelectTeams teams={teamsList} selectedTeams={selectedTeams}
                             onTeamSelect={handleTeamSelect}/>
                <SelectLimit limit={fixturesLimit} onLimitChange={handleLimitChange}/>
            </Flex>
            <FixturesList teamsList={teamsList} limit={fixturesLimit} selectedTeams={selectedTeams}/>
        </Flex>
    )
}