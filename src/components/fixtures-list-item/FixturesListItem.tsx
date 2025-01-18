import {FC} from "react";
import type {Fixture, Match, Team} from "../../types/types.ts";
import styles from "./FixturesListItem.module.scss";

interface Props {
    fixture: Fixture;
    teamName: string;
}

export const FixturesListItem: FC<Props> = ({fixture, teamName}) => {
    const matches = fixture.matches.map((match: Match) => {
        const opponentTeam: Team = match.homeTeam.id === fixture.teamId ? match.awayTeam : match.homeTeam;
        return <div className={styles.opponentTeamName} key={match.id}>
            <span>{opponentTeam.name}</span>
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