import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import {ReactNode} from "react";

const inter = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: "#03A9F4",
}

export const metadata: Metadata = {
    title: "Premier League Fixtures",
    description: "Premier league top teams las fixtures",
    robots: "index, follow",
    authors: [{name: "HK"}],
    keywords: "Football, Premier League, Fixtures, Table, England Premier League"
};

interface Props {
    children: Readonly<ReactNode>
}

export default function RootLayout({children}: Props) {
    return (
        <html lang="en">
        <body className={inter.variable}>
        <div className={styles.mainLayout}>
            {children}
        </div>
        </body>
        </html>
    );
}
