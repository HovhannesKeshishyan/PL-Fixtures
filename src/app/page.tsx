import {cookies} from "next/headers";
import {CookieBanner} from "@/app/components/cookie-banner/CookieBanner";
import {WithErrorBoundary} from "@/app/components/error-boundary/WithErrorBoundary";
import PlFixtures from "@/app/components/pl-fixtures/PlFixtures";

import type {FixturesLimit, Team} from "@/types/types";
import {getTeamsList} from "@/services";

const getDefaultSelectedTeams = (teamsList: Team[]): number[] => {
    const defaultIds = [64, 57, 65]; // Liverpool, Manchester City, Arsenal
    let teams: number[] = [];

    // adding with check to prevent error in case
    // if somehow team ids changed/removed in external API service
    defaultIds.forEach((id) => {
        if (teamsList.find(team => team.id === id)) {
            teams.push(id);
        }
    });
    // if somehow team ids changed/removed in external API service
    // set first 3 team ids
    if (!teams.length && teamsList.length > 2) {
        teams = [teamsList[0].id, teamsList[1].id, teamsList[2].id];
    }
    return teams;
}

const fetchTeamsList = async () => {
    let data: Team[] = [];
    try {
        data = await getTeamsList();
    } catch (err: unknown) {
        console.log(err);
    }
    return data;
}

const getSelectedTeamIds = async (teamsList: Team[]) => {
    const cookiesList = await cookies();
    const selectedTeamsFromCookies = cookiesList.get("selectedTeams")?.value;
    let selectedTeamIds: number[];
    if (selectedTeamsFromCookies) {
        selectedTeamIds = JSON.parse(selectedTeamsFromCookies);
    } else {
        // in case when no selected teams in first load
        // show by default selected teams list
        selectedTeamIds = getDefaultSelectedTeams(teamsList);
    }
    return selectedTeamIds;
}

const cookiesIsAccepted = async () => {
    const cookiesList = await cookies();
    return !!cookiesList.get("cookiesAccepted");
}

const getFixturesLimit = async () => {
    const cookiesList = await cookies();
    const limit = cookiesList.get("limit")?.value;
    if (!limit || !["all", "5", "10", "15"].includes(limit)) return "5";
    return limit as FixturesLimit;
}

async function App() {
    const teamsList = await fetchTeamsList();
    const limit = await getFixturesLimit();
    const cookiesAccepted = await cookiesIsAccepted();
    const selectedTeamIds = await getSelectedTeamIds(teamsList);

    return (
        <>
            <WithErrorBoundary>
                <PlFixtures teamsList={teamsList} selectedTeamIds={selectedTeamIds} limit={limit}/>
            </WithErrorBoundary>

            {!cookiesAccepted && <CookieBanner/>}
        </>
    )
}

export default App
