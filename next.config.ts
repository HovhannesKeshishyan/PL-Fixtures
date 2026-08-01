import type {NextConfig} from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "crests.football-data.org",
            }
        ]
    },
    env: {
        NEXT_PUBLIC_APP_VERSION: packageJson.version,
    },
};

export default nextConfig;
