/** @type {import('next').NextConfig} */

const ENV_VARIABLES_SERVER = [
  "STOREFRONT_API_KEY",
  "SHOPIFY_API_KEY",
  "SHOPIFY_SECRET_API_KEY",
  "SHOPIFY_DOMAIN"
];

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    const { isServer } = options;

    const defineTest = config.plugins.find(
      (x) => x instanceof options.webpack.DefinePlugin
    );
    if (defineTest) {
      if (isServer) {
        ENV_VARIABLES_SERVER.forEach((x) => {
          defineTest.definitions[`process.env.${x}`] = JSON.stringify(
            process.env[x]
          );
        });
      }
    }

    return config;
  },
};

module.exports = nextConfig;
