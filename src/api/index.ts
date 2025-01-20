import axios from "axios";
import type {Competition, Fixture, Team} from "../types/types.ts";

const BASE_URL_DEV = "http://localhost:4000";
const BASE_URL_PROD = "https://pl-fixtures-backend.vercel.app";
const BASE_URL = import.meta.env.MODE === "production" ? BASE_URL_PROD : BASE_URL_DEV;

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