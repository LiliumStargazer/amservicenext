import {withSentryConfig} from '@sentry/nextjs';
if (process.env.NODE_ENV === 'production') {
    // Importa dinamicamente cron.js solo in produzione
    import('./cron.js').then(_ => {
        // Il cron job è stato importato e eseguito
    }).catch(err => {
        console.error('Errore durante l\'importazione di cron.js:', err);
    });
}
// next.config.mjs
export default withSentryConfig({
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

    output:"standalone"
}, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "am-automatic-machines",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
});