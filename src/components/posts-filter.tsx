import React, { ChangeEvent } from "react";

interface IPostsFilterProps {
  onChangeFeatured: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeNewest: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PostsFilter(props: IPostsFilterProps) {
  const { onChangeFeatured, onChangeNewest, onChangeSearch } = props;

  return (
    <div className="flex mb-3 px-3 py-3 space-x-3 bg-gray-700 text-white rounded-md">
      <label className="block">
        <input type="checkbox" onChange={onChangeFeatured} />
        <span className="ml-1">Featured</span>
      </label>
      <label className="block">
        <input type="checkbox" onChange={onChangeNewest} />
        <span className="ml-1">Newest</span>
      </label>
      <div>
        <input
          className="border-white border-2 rounded-md px-2 text-black"
          type="text"
          placeholder="Search..."
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
}
