import http from "@/shared/api/http";

import type {Team} from "@/shared/types";

export const getTeamsList = async (): Promise<Team[]> => {
    const {data} = await http.get<Team[]>("/api/v1/teams");
    return data;
}