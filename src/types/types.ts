export interface Team {
    id: number;
    name: string;
    shortName: string;
    crest: string;
}

export interface Match {
    id: number;
    lastUpdated: string;
    utcDate: string;
    homeTeam: Team;
    awayTeam: Team;
    aiPrediction: {
        score: string;
        lastUpdated: string;
    } | null;
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
export interface ScorePredictionPayload {
    matchID: string;
    homeTeam: string;
    awayTeam: string;
    matchDate: string;
}