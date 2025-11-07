import type {FC} from "react";
import {Select} from "antd";

import type {FixturesLimit} from "@/types/types";

import styles from "./SelectLimit.module.scss";

interface Props {
    limit: FixturesLimit;
    onLimitChange: (value: FixturesLimit) => void
}

const limitOptions = [
    {value: 5, label: 5},
    {value: 10, label: 10},
    {value: 15, label: 15},
    {value: "all", label: "All"},
]

export const SelectLimit: FC<Props> = ({limit, onLimitChange}) => {
    return (
        <div className={styles.selectLimit}>
            <Select
                defaultValue={limit}
                style={{width: 120}}
                onChange={onLimitChange}
                options={limitOptions}
                aria-label="Select fixtures limit"
                data-testid="select-limit"
            />
        </div>
    );
}