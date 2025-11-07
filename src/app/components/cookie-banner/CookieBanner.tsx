"use client"

import {useState} from "react";
import Cookies from "js-cookie";
import {Button, Flex} from "antd";

import styles from "./CookieBanner.module.scss";

export const CookieBanner = () => {
    const [showCookieBanner, setShowCookieBanner] = useState(true);

    const closeCookieBanner = () => {
        setShowCookieBanner(false);
    }

    const acceptCookies = () => {
        Cookies.set("cookiesAccepted", "true", {expires: 365});
        closeCookieBanner();
    }

    const rejectCookies = () => {
        closeCookieBanner();
    }

    if (!showCookieBanner) return null;

    return (
        <div className={styles.cookieBanner}>
            <Flex gap={20} className={styles.cookieBannerContent} align="center">
                <p className={styles.cookieDescription} data-testid="cookie-text">
                    We use cookies to improve your onsite experience.
                    By continuing to use this site you are agreeing to our use of cookies.
                </p>

                <Flex gap={10} className={styles.cookieBannerButtons}>
                    <Button type="primary" onClick={acceptCookies} data-testid="cookie-btn-accept">Accept</Button>
                    <Button color="danger" variant="solid" onClick={rejectCookies} data-testid="cookie-btn-reject">Reject</Button>
                </Flex>
            </Flex>
        </div>
    );
};