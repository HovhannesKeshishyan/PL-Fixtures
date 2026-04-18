import {useState, useEffect, useMemo} from "react";

import {getAllFixtures} from "@/entities/fixture/api/getFixtures";

import type {Fixture, FixturesLimit, Match, Prediction} from "@/shared/types";

interface CachedFixtures {
    [teamId: string]: Fixture;
}

interface UseFixturesReturn {
    cachedFixtures: CachedFixtures;
    error: Error | null;
    addNewPrediction: (prediction: Prediction, matchUUID: string) => void;
}

export const useFixtures = (
    selectedTeams: number[],
    limit: FixturesLimit
): UseFixturesReturn => {
    const [cachedFixtures, setCachedFixtures] = useState<CachedFixtures>({});
    const [limitLastValue, setLimitLastValue] = useState<FixturesLimit>(limit);
    const [error, setError] = useState<Error | null>(null);

    const newAddedTeams = useMemo(() => {
        return selectedTeams.filter(teamId => !cachedFixtures[teamId]);
    }, [cachedFixtures, selectedTeams]);

    const limitIsChanged = limit !== limitLastValue;
    const needFetchAgain = !!newAddedTeams.length || limitIsChanged;

    const addNewPrediction = (prediction: Prediction, matchUUID: string) => {
        const [, homeTeamID, awayTeamID] = matchUUID.split("-");
        const updatedData = {...cachedFixtures};

        const relatedMatches: Match[] = [];
        [homeTeamID, awayTeamID].forEach(id => {
            if (updatedData[id]) relatedMatches.push(...updatedData[id].matches);
        });

        relatedMatches.forEach(match => {
            if (match.uuid === matchUUID) {
                match.aiPrediction = prediction;
            }
        });

        setCachedFixtures(updatedData);
    };

    useEffect(() => {
        if (!selectedTeams.length) return;
        if (!needFetchAgain) return;

        const fetchFixtures = async () => {
            try {
                const data = await getAllFixtures({ids: selectedTeams, limit});
                const newValue: CachedFixtures = {};
                data.forEach(item => {
                    newValue[item.teamId] = item;
                });
                setCachedFixtures(newValue);
                setLimitLastValue(limit);
            } catch (err) {
                setError(err as Error);
            }
        };

        fetchFixtures();
    }, [needFetchAgain, selectedTeams, limit]);

    return {cachedFixtures, error, addNewPrediction};
};