import http from "@/shared/api/http";

import type {Fixture, AllFixturesPayload} from "@/shared/types";

export const getAllFixtures = async (payload: AllFixturesPayload): Promise<Fixture[]> => {
    const {data} = await http.post<Fixture[]>("/api/v1/fixtures", payload);
    return data;
};