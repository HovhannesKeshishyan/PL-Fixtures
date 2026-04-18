export interface Team {
    id: number;
    name: string;
    shortName: string;
    crest: string;
}

export interface Prediction {
    score: string;
    lastUpdated: string;
}

export interface Match {
    id: number;
    uuid: string;
    lastUpdated: string;
    utcDate: string;
    homeTeam: Team;
    awayTeam: Team;
    aiPrediction: Prediction | null;
}

export interface Fixture {
    teamId: number;
    lastUpdated: number;
    matches: Match[];
}

export type FixturesLimit = "all" | "5" | "10" | "15";