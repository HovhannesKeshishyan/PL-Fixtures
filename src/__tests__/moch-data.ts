import type {Match, Team} from "@/types/types";

export const TEAMS = ["Liverpool", "Manchester City", "Arsenal"];

export const mockTeamsList: Team[] = TEAMS.map((teamName, index) => {
    return {
        id: index,
        name: teamName,
        shortName: "",
        crest: ""
    }
})

export const DATE_NOW = Date.now();

export const mockMatch: Match = {
    id: 101,
    uuid: "101-1-2",
    utcDate: "2025-10-26T14:00:00Z",
    homeTeam: mockTeamsList[0],
    awayTeam: mockTeamsList[1],
    aiPrediction: null,
    lastUpdated: ""
};