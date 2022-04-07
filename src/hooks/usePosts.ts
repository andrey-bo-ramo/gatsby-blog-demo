import { IPostNode } from "interfaces/common";
import { useEffect, useState } from "react";

function sortByCreatedAt(a: IPostNode, b: IPostNode): number {
  if (new Date(a.date) > new Date(b.date)) {
    return -1;
  }
  if (new Date(a.date) < new Date(b.date)) {
    return 1;
  }
  return 0;
}

interface IUsePostsValues {
  allPostsById: {
    [key: string]: IPostNode;
  };
  allIds: string[];
  newestIds: string[];
  featuredIds: string[];
  newestFeaturedIds: string[];
}

interface IUsePostsFilteredKeys {
  isShowFeatured: boolean;
  isShowNewest: boolean;
  searchValue: string;
}

const usePosts = (data: IPostNode[]) => {
  const [values, setValues] = useState<IUsePostsValues>({
    allPostsById: {},
    allIds: [],
    newestIds: [],
    featuredIds: [],
    newestFeaturedIds: [],
  });
  const [activePostsIds, setActivePostsIds] = useState<string[]>([]);

  useEffect(() => {
    const arr = [...data];
    const sortedArr = [...data].sort(sortByCreatedAt);
    const allPostsById: {
      [key: string]: IPostNode;
    } = {};
    const allIds: string[] = [];
    const newestIds: string[] = [];
    const featuredIds: string[] = [];
    const newestFeaturedIds: string[] = [];
    arr.forEach((item) => {
      allPostsById[item.id] = {
        ...item,
      };
      allIds.push(item.id);
      if (item.featured) {
        featuredIds.push(item.id);
      }
    });
    sortedArr.forEach((item) => {
      newestIds.push(item.id);
      if (item.featured) {
        newestFeaturedIds.push(item.id);
      }
    });
    setValues({
      allPostsById,
      allIds,
      newestIds,
      featuredIds,
      newestFeaturedIds,
    });
    setActivePostsIds(allIds);
  }, [data]);

  const getFilteredData = (keys: IUsePostsFilteredKeys): string[] => {
    const { isShowFeatured, isShowNewest, searchValue } = keys;
    let arr: string[] = [];
    if (isShowFeatured && !isShowNewest) {
      arr = values.featuredIds;
    }
    if (!isShowFeatured && isShowNewest) {
      arr = values.newestIds;
    }
    if (isShowFeatured && isShowNewest) {
      arr = values.newestFeaturedIds;
    }
    if (!isShowFeatured && !isShowNewest) {
      arr = values.allIds;
    }

    if (searchValue) {
      arr = arr.filter(
        (id) => values.allPostsById[id].slug.indexOf(searchValue) >= 0
      );
    }

    return arr;
  };

  return { values, activePostsIds, setActivePostsIds, getFilteredData };
};

export default usePosts;
