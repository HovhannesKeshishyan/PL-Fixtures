import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "crests.football-data.org",
            }
        ]
    }
};

export default nextConfig;
