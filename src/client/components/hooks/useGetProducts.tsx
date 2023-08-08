import { Product, ProductSortKeys } from "@/common/models/product";
import { objectKeys } from "@/common/utils/objectHelper";
import React from "react";

async function makeFetch<T>(
  url: string,
  options?: { text?: boolean; headers?: any }
) {
  const { text } = options || {};
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const d = await (text ? res.text() : res.json());
    if (!res.ok) throw new Error(d?.errorMessage || "bad Response");

    return d as T;
  });
}

const getProducts = (query?: { [key in string]?: string | number }) => {
  const queryValues = query
    ? objectKeys(query)
        .filter((x) => !!query[x])
        .map((x) => `${x}=${query[x]}`)
    : [];
  const queryValuesFormatted = queryValues.join("&");

  return makeFetch<{ data: Product[] }>(
    ["/api/products", queryValuesFormatted].filter((x) => !!x).join("?")
  );
};

function useGetProducts(search?: string, sort?: ProductSortKeys) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getProducts({ search, sort })
      .then((x) => {
        setProducts(x.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, [search, sort]);

  return {
    products,
    error,
    isLoading,
  };
}

export default useGetProducts;
