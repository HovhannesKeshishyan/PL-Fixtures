import axios from "axios";
import type {Fixture, Team, ScorePredictionPayload, AllFixturesPayload, Prediction} from "@/types/types";

const BASE_URL_DEV = "http://localhost:4000";
const BASE_URL_PROD = "https://pl-fixtures-backend.vercel.app";
const BASE_URL = process.env.NEXT_PUBLIC_MODE === "production" ? BASE_URL_PROD : BASE_URL_DEV;

export const getTeamsList = async (): Promise<Team[]> => {
    const {data} = await axios.get<Team[]>(`${BASE_URL}/api/teams`);
    return data;
}

export const getAllFixtures = async (payload: AllFixturesPayload): Promise<Fixture[]> => {
    const {data} = await axios.post<Fixture[]>(`${BASE_URL}/api/fixtures`, payload);
    return data;
}

export const getScorePrediction = async (payload: ScorePredictionPayload) => {
    const {data} = await axios.post<Prediction>(`${BASE_URL}/api/predict-scores`, payload);
    return data;
}