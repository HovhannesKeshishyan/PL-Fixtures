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
        return <div className={styles.opponentTeamNameWrapper} key={match.id}>
            <Image
                width={25}
                src={opponentTeam.crest}
            />
            <span className={styles.opponentTeamName}>{opponentTeam.name}</span>
            <Flex align="center" justify="center" className={stadiumClassName}>{stadium}</Flex>
        </div>
    });

    return (
        <div className={styles.fixturesListItemWrapper} key={fixture.teamId}>
            <div className={styles.fixturesListItem}>
                <div className={styles.mainTeamName}>
                    <span>{teamName}</span>
                </div>
                {matches}
            </div>
        </div>
    )
}