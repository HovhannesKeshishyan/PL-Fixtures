import {FC} from "react";
import styles from "./Header.module.scss";

export const Header: FC = () => {
    return (
        <h1 className={styles.header}>Premier League Fixtures</h1>
    )
}