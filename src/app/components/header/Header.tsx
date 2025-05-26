import type {FC} from "react";

import styles from "./Header.module.scss";

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <h1>Premier League Fixtures</h1>
        </header>
    )
}