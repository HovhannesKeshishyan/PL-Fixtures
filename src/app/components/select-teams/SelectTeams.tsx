import type {FC} from "react";
import {Select} from "antd";

import type {Team} from "@/types/types.ts";
import styles from "./SelectTeams.module.scss";

interface Props {
    teams: Team[];
    selectedTeams: number[];
    onTeamSelect: (value: number[]) => void;
}

export const SelectTeams: FC<Props> = ({teams, selectedTeams, onTeamSelect}) => {
    return (
        <div className={styles.selectTeams}>
            <Select
                className={styles.antSelect}
                mode="multiple"
                allowClear
                value={selectedTeams}
                placeholder="Please select"
                onChange={onTeamSelect}
                filterOption={(inputValue, option) => {
                    const optionValue: string = option?.["data-search-value"].toLowerCase();
                    return optionValue.startsWith(inputValue.toLowerCase());
                }
                }
                aria-label="search team"
                data-testid="select-teams"
            >
                {teams.map(team => {
                    return (
                        <Select.Option value={team.id}
                                       data-search-value={team.name}
                                       key={team.id}>
                            <span>{team.name}</span>
                        </Select.Option>
                    )
                })}
            </Select>
        </div>
    );
}