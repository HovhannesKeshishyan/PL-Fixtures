import {FC} from "react";
import {Select} from "antd";
import styles from "./SelectTeams.module.scss";
import type {Team} from "@/types/types.ts";

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
                    const optionValue: string = option?.['data-search-value'].toLowerCase();
                    return optionValue.startsWith(inputValue.toLowerCase());
                }
                }
                aria-label="search team"
            >
                {teams.map(team => {
                    return <Select.Option value={team.id} key={team.id}
                                          data-search-value={team.name}>{team.name}</Select.Option>
                })}
            </Select>
        </div>
    );
}