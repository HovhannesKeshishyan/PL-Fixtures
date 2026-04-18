import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider} from "antd";

import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";

import {Inter} from "next/font/google";

import {siteUrl, metaTitle, metaDescription, OGImageUrl} from "@/shared/config/metadata";
import {AntDesignConfigProvider} from "@/shared/config/ant-design-theme-config";

import {Header} from "@/widgets/header";
import {Footer} from "@/widgets/footer";
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
