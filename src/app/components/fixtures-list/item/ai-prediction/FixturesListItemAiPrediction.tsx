"use client"
import {type FC, useState, useRef, useMemo} from "react";
import {Button, Flex, Popover} from "antd";
import {OpenAIOutlined} from "@ant-design/icons";

import {getScorePrediction} from "@/services";

import type {Match, Prediction} from "@/types/types";

import styles from "./FixturesListItemAiPrediction.module.scss";

interface Props {
    match: Match;
    onNewPredictionAction: (prediction: Prediction, matchUUID: string) => void
}

const getFormattedPrediction = (match: Match) => {
    const score = match?.aiPrediction?.score;
    if (score) {
        return `${match.homeTeam.name} ${score} ${match.awayTeam.name}`;
    } else {
        return null;
    }
}

export const FixturesListItemAiPrediction: FC<Props> = ({match, onNewPredictionAction}) => {
    const [predictionIsLoading, setPredictionIsLoading] = useState(false);
    const [predictionError, setPredictionError] = useState(false);

    const payloadData = useMemo(() => ({
        matchUUID: match.uuid,
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        matchDate: match.utcDate,
    }), [match]);

    const popoverButtonRef = useRef<HTMLButtonElement>(null);

    const prediction = getFormattedPrediction(match);

    const getPrediction = async () => {
        setPredictionIsLoading(true);
        try {
            const newPrediction = await getScorePrediction(payloadData);
            onNewPredictionAction(newPrediction, match.uuid);
        } catch (error) {
            console.log(error);
            setPredictionError(true);
        }
        setPredictionIsLoading(false);
    }

    let content = null;
    if (prediction) content = <span>{prediction}</span>
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

    const ariaLabel = prediction ? `Prediction is ${prediction}` : "There is no prediction yet."

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