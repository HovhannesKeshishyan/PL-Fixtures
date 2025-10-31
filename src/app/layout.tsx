import {AntdRegistry} from "@ant-design/nextjs-registry";

import {ConfigProvider} from "antd";

import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import {Inter} from "next/font/google";

import {Header} from "@/app/components/header/Header";
import {Footer} from "@/app/components/footer/Footer";

import {siteUrl, metaTitle, metaDescription, OGImageUrl} from "@/constants/metadata";
import {AntDesignConfigProvider} from "@/constants/ant-design-theme-config";

import "./globals.scss";
import styles from "./layout.module.scss";

const inter = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: "#03A9F4",
}

export const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    robots: "index, follow",
    authors: [{name: "HK"}],
    keywords: "Premier League fixtures, EPL schedule, football matches, matchday",
    openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: "website",
        url: siteUrl,
        images: [
            {
                url: OGImageUrl,
                width: 1200,
                height: 630,
                alt: "Premier League Fixtures",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: [OGImageUrl],
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
            <AntdRegistry>
                <ConfigProvider theme={AntDesignConfigProvider}>
                    <main>
                        {children}
                    </main>
                </ConfigProvider>
            </AntdRegistry>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
