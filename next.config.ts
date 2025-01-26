import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "crests.football-data.org",
            }
        ]
    }
};

export default nextConfig;
