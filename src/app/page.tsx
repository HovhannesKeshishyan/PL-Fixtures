import {cookies} from "next/headers";
import PlFixtures from "@/app/components/pl-fixtures/PlFixtures";
import type {Team} from "@/types/types";
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

async function App() {
    const teamsList = await fetchTeamsList();
    const selectedTeamIds = await getSelectedTeamIds();

    return (
        <PlFixtures teamsList={teamsList} selectedTeamIds={selectedTeamIds}/>
    )
}

export default App
