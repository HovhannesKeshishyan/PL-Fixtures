import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import {ReactNode} from "react";
import {Header} from "@/app/components/header/Header";
import {Footer} from "@/app/components/footer/Footer";
import {AntdRegistry} from "@ant-design/nextjs-registry";

const inter = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: "#03A9F4",
}

export const metadata: Metadata = {
    title: "Premier League Fixtures & Schedule | Latest EPL Matches",
    description: "Get the latest Premier League fixtures, match schedules. Stay updated with the English Premier League's latest games.",
    robots: "index, follow",
    authors: [{name: "HK"}],
    keywords: "Premier League fixtures, EPL schedule, football matches, matchday",
    openGraph: {
        title: "Premier League Fixtures & Schedule | Latest EPL Matches",
        description: "Get the latest Premier League fixtures, match schedules. Stay updated with the English Premier League's latest games.",
        type: "website",
        url: "https://premierleague.vercel.app",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Premier League Fixtures",
            },
        ],
    },
};

interface Props {
    children: Readonly<ReactNode>
}

export default function RootLayout({children}: Props) {
    return (
        <html lang="en">
        <body className={inter.variable}>
        <div className={styles.mainLayout}>
            <Header/>
            <AntdRegistry>{children}</AntdRegistry>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
