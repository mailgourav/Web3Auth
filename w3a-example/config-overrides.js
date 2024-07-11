/*const {
  override,
  setWebpackOptimizationSplitChunks,
  adjustWorkbox,
} = require("customize-cra")
*/
const webpack = require("webpack")

/*
module.exports = override(
  setWebpackOptimizationSplitChunks({
    chunks: "all",
    minSize: 300000,
    maxSize: 3000000,
  }),
  adjustWorkbox((wb) =>
    Object.assign(wb, {
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html"),
      runtimeCaching: [
        {
          handler: "NetworkFirst",
        },
      ],
    })
  )
)
*/

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: false,
    assert: false,
    http: false,
    https: false,
    os: false,
    url: false,
    zlib: false,
    keccak: require.resolve("keccak"),
    // secp256k1: require.resolve("secp256k1")
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
