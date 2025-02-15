
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: {
        // removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node$/,
            loader: "node-loader",
        });
        // Important: return the modified config
        return config
    },
   output: "standalone",
};

export default nextConfig;