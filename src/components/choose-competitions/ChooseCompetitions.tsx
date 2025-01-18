import {FC, useState, useEffect} from "react";
import {Radio, type RadioChangeEvent} from "antd";
import styles from "./ChooseCompetitions.module.scss";
import {getAvailableCompetitions} from "../../api";

interface Props {
    onChange: (value: string) => void
}

export const ChooseCompetitions: FC<Props> = ({onChange}) => {
    const [competitions, setCompetitions] = useState<{ [key: string]: string }>({All: ""});
    const [value, setValue] = useState("");

    const handleChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setValue(value);
        onChange(value);
    }

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const data = await getAvailableCompetitions();
                setCompetitions({All: "", ...data});
            } catch (err: unknown) {
                console.log(err);
            }
        }

        fetchCompetitions();
    }, []);

    return (
        <div className={styles.chooseCompetition}>
            <Radio.Group onChange={handleChange} value={value}>
                {Object.entries(competitions).map(option => {
                    const [label, value] = option;
                    return <Radio value={value} className={styles.radioGroup} key={value}>{label}</Radio>
                })}
            </Radio.Group>
        </div>
    )
}