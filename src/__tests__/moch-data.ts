import type {Match, Team} from "@/types/types";

export const MOCK_TEAM_NAMES = ["Liverpool", "Manchester City", "Arsenal"];

export const MOCK_TEAMS_LIST: Team[] = MOCK_TEAM_NAMES.map((teamName, index) => {
    return {
        id: index,
        name: teamName,
        shortName: "",
        crest: ""
    }
})

export const MOCK_SELECTED_TEAMS_IDS = MOCK_TEAMS_LIST.map(team => team.id);

export const DATE_NOW = Date.now();

export const MOCK_MATCH: Match = {
    id: 101,
    uuid: "101-1-2",
    utcDate: "2025-10-26T14:00:00Z",
    homeTeam: MOCK_TEAMS_LIST[0],
    awayTeam: MOCK_TEAMS_LIST[1],
    aiPrediction: null,
    lastUpdated: ""
};