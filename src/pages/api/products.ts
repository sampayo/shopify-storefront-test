import { ApiVersion, shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { shopifyApiKey, shopifySecretApiKey, shopifyShop, storefrontApiKey } from '@/common/configuration';
import { Product } from '@/common/models/product';
import assertNonNullish from '@/common/utils/assertHelper';

type Data = {
  data?: Product[];
  errorMessage?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { query } = req;
    const search = query?.search as string | undefined;
    const sort = (query?.sort as string) || 'RELEVANCE';

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
      hostName: 'http://localhost:3001',
      apiKey: apiKey,
      scopes: ['read_products'],
      apiVersion: ApiVersion.April23,
      isEmbeddedApp: false,
    });

    const storefrontClient = new shopify.clients.Storefront({
      domain: hostName,
      storefrontAccessToken: storefrontAccessToken,
    });

    const productsRequest = await storefrontClient.query<{
      data: { products: { edges: { node: Product }[] } };
    }>({
      data: {
        variables: { search: search, sort: sort },
        query: `query SearchProducts($search: String, $sort: ProductSortKeys) {
        products (first: 50, query: $search, sortKey: $sort) {
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
        variabes: { search: search || '' },
      },
      // query: { search: search || "" },
      // query: { search: search || "" },
      // TODO: use the right api to use graphql and pass parameters
      //     data: `query SearchProducts {
      //       products (first: 50, query: "${search || ""}, sortKey: ${sort}") {
      //         edges {
      //           node {
      //             id
      //             title
      //             description
      //             featuredImage {
      //               id
      //               url
      //             }
      //             handle
      //             productType
      //             priceRange {
      //               minVariantPrice {
      //                 amount
      //                 currencyCode
      //               }
      //               maxVariantPrice {
      //                 amount
      //                 currencyCode
      //               }
      //             }
      //           }
      //         }
      //       }
      // }`,
    });

    const products = productsRequest.body?.data?.products?.edges;
    res.status(200).json({ data: products.map((x) => x.node) });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ errorMessage: error?.message || 'something went wrong' });
  }
}
