import {FC, type ForwardRefExoticComponent} from "react";
import styles from "./Footer.module.scss";
import {FacebookFilled, GithubOutlined, LinkedinFilled, XOutlined} from "@ant-design/icons";
import {type AntdIconProps} from "@ant-design/icons/es/components/AntdIcon";

interface SocialMedia {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<AntdIconProps, "ref">>;
}

const socialLinks: SocialMedia[] = [
    {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/hovhannes-keshishyan",
        icon: LinkedinFilled
    },
    {
        name: "Github",
        href: "https://github.com/Hovhannes1991",
        icon: GithubOutlined
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/HovoKeshishyan",
        icon: FacebookFilled
    },
    {
        name: "X",
        href: "https://x.com/hovo1991",
        icon: XOutlined
    },
]

export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerRow} ${styles.footerRow1}`}>
                <p>Contacts</p>
                <ul className={styles.socialMedia}>
                    {socialLinks.map(item => {
                        return (
                            <li key={item.name}>
                                <a href={item.href}
                                   target="_blank"
                                   aria-label={`${item.name} link`}
                                   rel="noreferer, noopener">
                                    <item.icon/>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={`${styles.footerRow} ${styles.footerRow2}`}>
                <span>© {new Date().getFullYear()}</span>
            </div>
        </footer>
    )
}