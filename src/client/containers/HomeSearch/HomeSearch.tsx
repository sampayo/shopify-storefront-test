import useTimeout from "@/client/components/hooks/useTimeout";
import React from "react";

export interface IHomeSearchProps {
  className?: string;
  onSubmit?: (value?: string) => void;
}

function HomeSearch(props: IHomeSearchProps) {
  const { onSubmit } = props;
  const { startTimeout, stopTimeout } = useTimeout(400);

  const submit = (searchValue: string | undefined) => {
    stopTimeout();

    if (onSubmit) onSubmit(searchValue);
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (e?.preventDefault) e.preventDefault();

    const formData = new FormData(e.target as any);
    const searchValue = (formData.get("search") as string) || undefined;
    // if (!searchValue || (searchValue?.length || 0) < 2) return;

    submit(searchValue ? searchValue : undefined);
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = (e.target.value as string) || undefined;
    // if (!searchValue || (searchValue?.length || 0) < 2) return;

    startTimeout(() => submit(searchValue ? searchValue : undefined));
    //
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="input"
        placeholder="Search"
        name="search"
        onChange={handleOnChange}
        className="bg-transparent border border-solid border-gray-200 px-4 py-2 rounded-sm w-full"
      ></input>
      <button type="submit" hidden />
    </form>
  );
}

export default HomeSearch;
