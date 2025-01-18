import axios from "axios";
import type {Competition, Fixture, Team} from "../types/types.ts";

const BASE_URL = "https://vercel.com/hovhannes-projects-49985ff0/pl-fixtures-backend";

export const getTeamsList = async (): Promise<Team[]> => {
    const {data} = await axios.get<Team[]>(`${BASE_URL}/api/teams`);
    return data;
}

export const getAllFixtures = async (teamIds: number[], limit: number, competitions: string | string[]): Promise<Fixture[]> => {
    const payload = {
        ids: teamIds,
        limit,
        competitions
    }
    const {data} = await axios.post<Fixture[]>(`${BASE_URL}/api/fixtures`, payload);
    return data;
}

export const getAvailableCompetitions = async () => {
    const {data} = await axios.get<Competition>(`${BASE_URL}/api/competitions`);
    return data;
}