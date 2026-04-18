import type {FixturesLimit} from "./domain.types";

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