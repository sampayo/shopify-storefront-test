/* eslint-disable @next/next/no-img-element */
import { Product } from "@/common/models/product";
import React from "react";

interface IProductProps {
  product: Product;
}
function ProductCard(props: IProductProps) {
  const { product } = props;
  return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {product.title && product.featuredImage?.url && (
          <img
            src={product.featuredImage?.url}
            alt={product.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-200">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            from {product.priceRange?.minVariantPrice?.amount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
