import {cookies} from "next/headers";

import {PlFixtures} from "@/widgets/pl-fixtures";
import {CookieConsent} from "@/features/cookie-consent";
import {getTeamsList} from "@/entities/team/api/getTeams";

import type {FixturesLimit, Team} from "@/shared/types";

const DEFAULT_TEAM_IDS = [64, 57, 65]; // Liverpool, Manchester City, Arsenal

const getDefaultSelectedTeams = (teamsList: Team[]): number[] => {
    let teams = DEFAULT_TEAM_IDS.filter(id =>
        teamsList.some(team => team.id === id)
    );

    if (!teams.length && teamsList.length > 2) {
        teams = [teamsList[0].id, teamsList[1].id, teamsList[2].id];
    }

    return teams;
};

const fetchTeamsList = async (): Promise<Team[]> => {
    try {
        return await getTeamsList();
    } catch (err) {
        console.error(err);
        return [];
    }
};

const getSelectedTeamIds = async (teamsList: Team[]): Promise<number[]> => {
    const cookiesList = await cookies();
    const fromCookies = cookiesList.get("selectedTeams")?.value;

    return fromCookies
        ? JSON.parse(fromCookies)
        : getDefaultSelectedTeams(teamsList);
};

const getFixturesLimit = async (): Promise<FixturesLimit> => {
    const cookiesList = await cookies();
    const limit = cookiesList.get("limit")?.value;

    if (!limit || !["all", "5", "10", "15"].includes(limit)) return "5";
    return limit as FixturesLimit;
};

const cookiesIsAccepted = async (): Promise<boolean> => {
    const cookiesList = await cookies();
    return !!cookiesList.get("cookiesAccepted");
};

export const FixturesView = async () => {
    const teamsList = await fetchTeamsList();
    const limit = await getFixturesLimit();
    const cookiesAccepted = await cookiesIsAccepted();
    const selectedTeamIds = await getSelectedTeamIds(teamsList);

    return (
        <>
            <PlFixtures
                teamsList={teamsList}
                selectedTeamIds={selectedTeamIds}
                limit={limit}
            />
            {!cookiesAccepted && <CookieConsent/>}
        </>
    );
}