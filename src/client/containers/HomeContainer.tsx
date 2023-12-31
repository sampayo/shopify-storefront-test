import React from 'react';
import Image from 'next/image';
import { ProductSortKeys } from '@/common/models/product';
import MainLayout from '../components/Layout/MainLayout';
import ProductCard from '../components/ProductCard';
import useGetProducts from '../components/hooks/useGetProducts';
import HomeSearch, { IHomeSearchProps } from './HomeSearch';

function HomeContainer() {
  const [query, setQuery] = React.useState<{
    search?: string;
    sort?: ProductSortKeys;
  }>();
  const { products, error } = useGetProducts(query?.search, query?.sort);

  const handleOnSubmit: IHomeSearchProps['onSubmit'] = (v) => {
    setQuery(v);
  };

  console.log(products);
  const productComponents = products?.map((x) => {
    return <ProductCard key={`HomeContainer-${x.id}`} product={x} />;
  });

  return (
    <MainLayout>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-300">Products</h1>
          <div>
            <HomeSearch onSubmit={handleOnSubmit} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productComponents}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomeContainer;
