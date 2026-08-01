import Link from "next/link";
import styles from "./NotFoundView.module.scss";

export const NotFoundView = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.error404}>404</h1>
            <div className={styles.message}>Oops!!! Page is not found</div>
            <Link href={"/"}>Go to home page</Link>
        </div>
    )
}