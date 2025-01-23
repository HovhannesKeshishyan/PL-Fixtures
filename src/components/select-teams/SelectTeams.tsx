import {FC} from "react";
import {Select} from "antd";
import styles from "./SelectTeams.module.scss";
import type {Team} from "../../types/types.ts";

interface Props {
    teams: Team[];
    selectedTeams: number[];
    loading: boolean;
    onTeamSelect: (value: number[]) => void;
}

export const SelectTeams: FC<Props> = ({teams, selectedTeams, loading, onTeamSelect}) => {
    return (
        <div className={styles.selectTeams}>
            <Select
                className={styles.antSelect}
                mode="multiple"
                loading={loading}
                disabled={loading}
                allowClear
                value={selectedTeams}
                placeholder="Please select"
                onChange={onTeamSelect}
                filterOption={(inputValue, option) => {
                    const optionValue: string = option?.['data-search-value'].toLowerCase();
                    return optionValue.startsWith(inputValue.toLowerCase());
                }
                }
            >
                {teams.map(team => {
                    return <Select.Option value={team.id} key={team.id}
                                          data-search-value={team.name}>{team.name}</Select.Option>
                })}
            </Select>
        </div>
    );
}