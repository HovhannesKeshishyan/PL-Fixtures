import type {FC, ReactElement} from "react";
import Image from "next/image";
import {Flex, Skeleton} from "antd";

import {FixturesListItemDate} from "./date/FixturesListItemDate";
import {FixturesListItemAiPrediction} from "./ai-prediction/FixturesListItemAiPrediction";

import type {Fixture, Match, Prediction, Team} from "@/types/types.ts";
import styles from "./FixturesListItem.module.scss";

interface Props {
    fixture: Fixture;
    teamName: string;
    isLoading: boolean;
    onNewPredictionAction: (prediction: Prediction, matchUUID: string) => void
}

export const FixturesListItem: FC<Props> = ({fixture, teamName, isLoading, onNewPredictionAction}) => {
    let matches: ReactElement | ReactElement[];
    if (isLoading) {
        matches = <div className={styles.skeletonWrapper}>
            <Skeleton active/>
        </div>
    } else {
        if(fixture.matches.length) {
            matches = fixture.matches.map((match: Match) => {
                const opponentTeam: Team = match.homeTeam.id === fixture.teamId ? match.awayTeam : match.homeTeam;
                const stadium = opponentTeam.id === match.homeTeam.id ? "A" : "H";
                const stadiumClassName = stadium === "H" ? styles.stadium : styles.stadium + " " + styles.awayStadium;
                const ariaLabel = `${opponentTeam.name} ${stadium === "H" ? "Home game" : "Away game"}`;
                return (
                    <li className={styles.opponentTeamNameWrapper}
                        tabIndex={0}
                        aria-label={ariaLabel}
                        key={match.id}>
                        <Image
                            width={25}
                            height={25}
                            alt={`${opponentTeam.name} logo`}
                            src={opponentTeam.crest}
                        />

                        <span className={styles.opponentTeamName}>
                              <h3 className="app_text-ellipsis">{opponentTeam.name}</h3>
                        </span>

                        <FixturesListItemDate utcDate={match.utcDate}/>

                        <Flex align="center" justify="center" className={stadiumClassName}>
                            <span aria-label={ariaLabel}>{stadium}</span>
                        </Flex>

                        <FixturesListItemAiPrediction match={match} onNewPredictionAction={onNewPredictionAction}/>
                    </li>
                )
            });
        } else {
            matches = <li className={styles.noMoreFixturesMessage}>The fixtures for new season will be available soon</li>
        }
    }

    let wrapperClassName = styles.fixturesListItemWrapper;
    if(!fixture?.matches.length) {
        wrapperClassName += ` ${styles.noMoreFixtures}`;
    }

    return (
        <div className={wrapperClassName}>
            <ul className={styles.fixturesListItem} data-testid="fixtures-list-item">
                <li className={styles.mainTeamName}
                    tabIndex={0}
                    aria-label={`${teamName} fixtures`}>
                    <h2 className="app_text-ellipsis">{teamName}</h2>
                </li>
                {matches}
            </ul>
        </div>
    )
}