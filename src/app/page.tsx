import {cookies} from "next/headers";
import {WithErrorBoundary} from "@/app/components/error-boundary/WithErrorBoundary";
import PlFixtures from "@/app/components/pl-fixtures/PlFixtures";
import type {FixturesLimit, Team} from "@/types/types";
import {getTeamsList} from "@/services";

const fetchTeamsList = async () => {
    let data: Team[] = [];
    try {
        data = await getTeamsList();
    } catch (err: unknown) {
        console.log(err);
    }
    return data;
}

const getSelectedTeamIds = async () => {
    const cookiesList = await cookies();
    const selectedTeamsFromCookies = cookiesList.get("selectedTeams")?.value;
    let selectedTeamIds: number[] = [];
    if (selectedTeamsFromCookies) {
        selectedTeamIds = JSON.parse(selectedTeamsFromCookies);
    }
    return selectedTeamIds;
}

const getFixturesLimit = async () => {
    const cookiesList = await cookies();
    const limit = cookiesList.get("limit")?.value;
    if (!limit || !["all", "5", "10", "15"].includes(limit)) return "5";
    return limit as FixturesLimit;
}

async function App() {
    const teamsList = await fetchTeamsList();
    const selectedTeamIds = await getSelectedTeamIds();
    const limit = await getFixturesLimit();

    return (
        <WithErrorBoundary>
            <PlFixtures teamsList={teamsList} selectedTeamIds={selectedTeamIds} limit={limit}/>
        </WithErrorBoundary>
    )
}

export default App
