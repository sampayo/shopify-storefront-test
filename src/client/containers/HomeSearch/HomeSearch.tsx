import React from 'react';
import useTimeout from '@/client/components/hooks/useTimeout';
import { ProductSortKeys } from '@/common/models/product';

export interface IHomeSearchProps {
  className?: string;
  onSubmit?: (query?: { search?: string; sort?: ProductSortKeys }) => void;
}

function HomeSearch(props: IHomeSearchProps) {
  const { onSubmit } = props;
  const { startTimeout, stopTimeout } = useTimeout(400);
  const formDataRef = React.useRef<{ search?: string; sort?: ProductSortKeys }>({});

  const submit = (formData?: { search?: string; sort?: ProductSortKeys }) => {
    stopTimeout();

    if (onSubmit) onSubmit(formData);
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (e?.preventDefault) e.preventDefault();

    const formData = new FormData(e.target as any);
    const searchValue = (formData.get('search') as string) || undefined;
    const sortingValue = (formData.get('sorting') as ProductSortKeys) || undefined;

    formDataRef.current = { sort: sortingValue, search: searchValue };
    submit({ ...formDataRef.current });
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = (e.target.value as string) || undefined;

    formDataRef.current = { ...formDataRef.current, search: searchValue };
    startTimeout(() => {
      submit(formDataRef.current);
    });
  };

  const handleOnSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const sortValue = (e.target.value as ProductSortKeys) || undefined;

    startTimeout(() => {
      formDataRef.current = { ...formDataRef.current, sort: sortValue };
      submit(formDataRef.current);
    });
  };

  return (
    <form onSubmit={handleOnSubmit} className="gap-4 flex flex-col">
      <input
        type="input"
        placeholder="Search"
        name="search"
        onChange={handleOnChange}
        className="bg-transparent border border-solid border-gray-200 px-4 py-2 rounded-sm w-full"
      ></input>
      <select
        name="sorting"
        defaultValue="RELEVANCE"
        onChange={handleOnSortChange}
        className=" bg-transparent border border-solid border-gray-200 px-4 py-2 rounded-sm max-w-[200PX]"
      >
        <option value="TITLE">Title</option>
        <option value="PRICE">Price</option>
        <option value="RELEVANCE">Relevance</option>
      </select>
      <button type="submit" hidden />
    </form>
  );
}

export default HomeSearch;
