// next.config.mjs
export default {
    webpack: (config, { isServer }) => {
        // Aggiungi una regola per gestire i file binari
        config.module.rules.push({
            test: /\.(bin|node)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: `/_next/static/`,
                outputPath: `${isServer ? '../' : ''}static/`,
            },
        });
        return config;
    },
    output:"standalone",
};
 