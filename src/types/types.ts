export interface Prediction {
    score: string;
    lastUpdated: string;
}

export interface Team {
    id: number;
    name: string;
    shortName: string;
    crest: string;
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

export interface DateTimeFormatOptions {
    day?: "numeric" | "2-digit" | undefined;
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
    year?: "2-digit" | "numeric" | undefined;
    hour?: "2-digit" | "numeric" | undefined;
    minute?: "2-digit" | "numeric" | undefined;
    hour12?: boolean;
}

// Request Payloads
export interface AllFixturesPayload {
    ids: number[];
    limit: FixturesLimit;
}

export interface ScorePredictionPayload {
    matchUUID: string;
    homeTeam: string;
    awayTeam: string;
    matchDate: string;
}