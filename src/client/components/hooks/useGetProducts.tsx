import { Product } from "@/common/models/product";
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

const getProducts = () => {
  return makeFetch<{ data: Product[] }>("/api/products");
};

function useGetProducts(search?: string) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getProducts()
      .then((x) => {
        setProducts(x.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, [search]);

  return {
    products,
    error,
    isLoading,
  };
}

export default useGetProducts;
