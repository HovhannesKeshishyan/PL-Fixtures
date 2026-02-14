import type {FC} from "react";
import {Select} from "antd";
import type {DefaultOptionType} from "@rc-component/select/es/Select";

import type {Team} from "@/types/types.ts";
import styles from "./SelectTeams.module.scss";

interface Props {
    teams: Team[];
    selectedTeams: number[];
    onTeamSelect: (value: number[]) => void;
}

export const SelectTeams: FC<Props> = ({teams, selectedTeams, onTeamSelect}) => {
    const filterOption = (inputValue: string, option: DefaultOptionType | undefined) => {
        return option?.labelLower.startsWith(inputValue.toLocaleLowerCase());
    }

    const options = teams.map(team => {
        return {
            value: team.id,
            label: team.name,
            labelLower: team.name.toLocaleLowerCase()
        }
    })

    return (
        <div className={styles.selectTeams}>
            <Select
                className={styles.antSelect}
                mode="multiple"
                allowClear
                value={selectedTeams}
                placeholder="Please select"
                onChange={onTeamSelect}
                showSearch={{filterOption}}
                aria-label="search team"
                data-testid="select-teams"
                options={options}
            />
        </div>
    );
}