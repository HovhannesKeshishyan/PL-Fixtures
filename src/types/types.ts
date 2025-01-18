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
}

export interface Fixture {
    teamId: number;
    lastUpdated: number;
    matches: Match[];
}

export interface Competition {
    [key: string]: string;
}