"use client"
import {type FC, useEffect, useState} from "react";
import {Popover} from "antd";
import {CalendarOutlined} from "@ant-design/icons";

import {utcDateToLocal} from "@/helpers/date-parse";

import styles from "./FixturesListItemDate.module.scss";

interface Props {
    utcDate: string;
}

export const FixturesListItemDate: FC<Props> = ({utcDate}) => {
    const [localDate, setLocalDate] = useState<string>("");
    const [localTime, setLocalTime] = useState<string>("");

    useEffect(() => {
        const [localDate, localTime] = utcDateToLocal(utcDate)
        setLocalDate(localDate);
        setLocalTime(localTime)
    }, [utcDate]);

    return (
        <div className={styles.fixturesListItemDate}>
            <Popover title={localDate || ""} content={localTime}>
                <CalendarOutlined/>
            </Popover>
        </div>
    )
}