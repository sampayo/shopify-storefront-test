export interface VariantPrice {
  amount: string;
  currencyCode: string;
}
export interface Product {
  title?: string;
  id: string;
  description?: string;
  featuredImage?: {
    id: string;
    url: string;
  };
  handle: string;
  productType: string;
  priceRange: {
    minVariantPrice: VariantPrice;
    maxVariantPrice: VariantPrice;
  };
}
