import { useEffect, useState } from "react";

function sortByCreatedAt(a, b) {
  if (new Date(a.date) > new Date(b.date)) {
    return -1;
  }
  if (new Date(a.date) < new Date(b.date)) {
    return 1;
  }
  return 0;
}

const usePosts = (data = []) => {
  const [values, setValues] = useState({
    allPostsById: {},
    allIds: [],
    newestIds: [],
    featuredIds: [],
    newestFeaturedIds: [],
  });
  const [activePostsIds, setActivePostsIds] = useState([]);

  useEffect(() => {
    const arr = [...data];
    const sortedArr = [...data].sort(sortByCreatedAt);
    const allPostsById = {};
    const allIds = [];
    const newestIds = [];
    const featuredIds = [];
    const newestFeaturedIds = [];
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

  const getFilteredData = (keys) => {
    const { isShowFeatured, isShowNewest } = keys;
    if (isShowFeatured && !isShowNewest) {
      setActivePostsIds(values.featuredIds);
    }
    if (!isShowFeatured && isShowNewest) {
      setActivePostsIds(values.newestIds);
    }
    if (isShowFeatured && isShowNewest) {
      setActivePostsIds(values.newestFeaturedIds);
    }
    if (!isShowFeatured && !isShowNewest) {
      setActivePostsIds(values.allIds);
    }
  };

  return { values, activePostsIds, getFilteredData };
};

export default usePosts;
