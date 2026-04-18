import http from "@/shared/api/http";
import type {ScorePredictionPayload, Prediction} from "@/shared/types";

export const getScorePrediction = async (payload: ScorePredictionPayload) => {
    const {data} = await http.post<Prediction>("/api/v2/predict-scores", payload);
    return data;
}