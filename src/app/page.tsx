import {cookies} from "next/headers";
import {CookieBanner} from "@/app/components/cookie-banner/CookieBanner";
import {WithErrorBoundary} from "@/app/components/error-boundary/WithErrorBoundary";
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

const cookiesIsAccepted = async () => {
    const cookiesList = await cookies();
    return !!cookiesList.get("cookiesAccepted");
}

async function App() {
    const teamsList = await fetchTeamsList();
    const selectedTeamIds = await getSelectedTeamIds();
    const cookiesAccepted = await cookiesIsAccepted();

    return (
        <>
            <WithErrorBoundary>
                <PlFixtures teamsList={teamsList} selectedTeamIds={selectedTeamIds}/>
            </WithErrorBoundary>
            <PlFixtures teamsList={teamsList} selectedTeamIds={selectedTeamIds} cookiesAccepted={cookiesAccepted}/>
            {!cookiesAccepted && <CookieBanner/>}
        </>
    )
}

export default App
