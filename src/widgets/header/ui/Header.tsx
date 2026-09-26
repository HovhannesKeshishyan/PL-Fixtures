import Link from "next/link";
import type {FC} from "react";

import styles from "./Header.module.scss";

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <h1>
                <Link href="/">
                    Premier League Results
                </Link>
            </h1>
        </header>
    )
}