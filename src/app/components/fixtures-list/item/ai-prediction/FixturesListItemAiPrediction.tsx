"use client"
import {type FC, useState, useRef, useMemo} from "react";
import {Button, Flex, Popover} from "antd";
import {OpenAIOutlined} from "@ant-design/icons";

import {getScorePrediction} from "@/services";

import type {Match} from "@/types/types";

import styles from "./FixturesListItemAiPrediction.module.scss";

interface Props {
    match: Match;
}

export const FixturesListItemAiPrediction: FC<Props> = ({match}) => {
    const [prediction, setPrediction] = useState<string | null>(null);
    const [predictionIsLoading, setPredictionIsLoading] = useState(false);
    const [predictionError, setPredictionError] = useState(false);

    const payloadData = useMemo(() => ({
        matchUUID: String(match.uuid),
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        matchDate: match.utcDate,
    }), [match]);

    const popoverButtonRef = useRef<HTMLButtonElement>(null);

    const existingPrediction = match.aiPrediction?.score || prediction;

    const getPrediction = async () => {
        setPredictionIsLoading(true);
        try {
            const response = await getScorePrediction(payloadData);
            setPrediction(response.score);
            console.log(response.score)
        } catch (error) {
            console.log(error);
            setPredictionError(true);
        }
        setPredictionIsLoading(false);
    }

    let content = null;
    if (existingPrediction) content = <span>{existingPrediction}</span>
    else if (predictionIsLoading) {
        content = <span>Loading prediction...</span>
    } else if (predictionError) {
        content = <span>Prediction failed!</span>
    } else {
        content = <div>
            <Button ref={popoverButtonRef}
                    type="default"
                    variant="outlined"
                    onClick={getPrediction}
                    loading={predictionIsLoading}
                    disabled={predictionIsLoading}>Get AI prediction</Button>
        </div>
    }

    const handleOpenChange = (opened: boolean) => {
        if(opened && popoverButtonRef.current) {
            popoverButtonRef.current.focus();
        }
    }

    const ariaLabel = existingPrediction ? `Prediction is ${existingPrediction}` : "There is no prediction yet."

    return (
        <Flex align="center" justify="center" className={styles.aiPrediction} aria-label={ariaLabel}>
            <Popover content={content} trigger={["hover", "click"]} afterOpenChange={handleOpenChange}>
                <button type="button">
                    <OpenAIOutlined/>
                </button>
            </Popover>
        </Flex>
    )
}