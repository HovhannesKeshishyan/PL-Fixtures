import {FC, ReactNode} from "react";
import styles from "./MainLayout.module.scss";

interface Props {
    children: ReactNode[];
}

export const MainLayout: FC<Props> = ({children}) => {
    return (
        <div className={styles.mainLayout}>
            {children}
        </div>
    )
}