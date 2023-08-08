import type { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { ApiVersion, Shopify, shopifyApi } from "@shopify/shopify-api";
import {
  shopifyApiKey,
  shopifySecretApiKey,
  shopifyShop,
  storefrontApiKey,
} from "@/common/configuration";
import assertNonNullish from "@/common/utils/assertHelper";
import { Product } from "@/common/models/product";

type Data = {
  data?: Product[];
  errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // const apiKey = storefrontApiKey();
    const apiSecretKey = shopifySecretApiKey();
    const apiKey = shopifyApiKey();
    const storefrontAccessToken = storefrontApiKey();
    const hostName = shopifyShop();
    assertNonNullish(apiSecretKey);
    assertNonNullish(apiKey);
    assertNonNullish(storefrontAccessToken);
    assertNonNullish(hostName);

    const shopify = shopifyApi({
      apiSecretKey: apiSecretKey,
      hostName: "http://localhost:3001",
      apiKey: apiKey,
      scopes: ["read_products"],
      apiVersion: ApiVersion.April23,
      isEmbeddedApp: false,
    });

    // console.log("-0-0-0-0-0-0");
    const storefrontClient = new shopify.clients.Storefront({
      domain: hostName,
      storefrontAccessToken: storefrontAccessToken,
    });

    const productsRequest = await storefrontClient.query<{
      data: { products: { edges: { node: Product }[] } };
    }>({
      data: `{
        products (first: 10) {
          edges {
            node {
              id
              title
              description
              featuredImage {
                id
                url
              }
              handle
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
  }`,
    });

    const products = productsRequest.body?.data?.products?.edges;
    res.status(200).json({ data: products.map((x) => x.node) });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ errorMessage: error?.message || "something went wrong" });
  }
}
