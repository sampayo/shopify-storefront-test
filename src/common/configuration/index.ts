export const storefrontApiKey = () => process.env.STOREFRONT_API_KEY;
export const shopifyApiKey = () => process.env.SHOPIFY_API_KEY;
export const shopifySecretApiKey = () => process.env.SHOPIFY_SECRET_API_KEY;
export const shopifyShop = () => process.env.SHOPIFY_DOMAIN;

export const environments = () => ({
  STOREFRONT_API_KEY: storefrontApiKey(),
  SHOPIFY_API_KEY: shopifyApiKey(),
  SHOPIFY_SECRET_API_KEY: shopifySecretApiKey(),
  SHOPIFY_DOMAIN: shopifyShop(),
});
