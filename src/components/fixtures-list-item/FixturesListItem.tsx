import {FC} from "react";
import type {Fixture, Match, Team} from "../../types/types.ts";
import styles from "./FixturesListItem.module.scss";
import {Flex, Image} from "antd";

interface Props {
    fixture: Fixture;
    teamName: string;
}

export const FixturesListItem: FC<Props> = ({fixture, teamName}) => {
    const matches = fixture.matches.map((match: Match) => {
        const opponentTeam: Team = match.homeTeam.id === fixture.teamId ? match.awayTeam : match.homeTeam;
        const stadium = opponentTeam.id === match.homeTeam.id ? "A" : "H";
        const stadiumClassName = stadium === "H" ? styles.stadium : styles.stadium + " " + styles.awayStadium;
        const ariaLabel = `${opponentTeam.name} ${stadium === "H" ? "Home game" : "Away game"}`;
        return <li className={styles.opponentTeamNameWrapper} key={match.id}>
            <Image
                width={25}
                height={25}
                alt={`${opponentTeam.name} logo`}
                src={opponentTeam.crest}
            />
            <span className={styles.opponentTeamName + " app_text-ellipsis"} tabIndex={0}
                  aria-label={ariaLabel}>{opponentTeam.name}</span>
            <Flex align="center" justify="center" className={stadiumClassName}>
                <span aria-label={ariaLabel}>{stadium}</span>
            </Flex>
        </li>
    });

    return (
        <div className={styles.fixturesListItemWrapper} key={fixture.teamId}>
            <ul className={styles.fixturesListItem}>
                <li className={styles.mainTeamName + " app_text-ellipsis"}>
                    <span tabIndex={0} aria-label={`${teamName} fixtures`}>{teamName}</span>
                </li>
                {matches}
            </ul>
        </div>
    )
}