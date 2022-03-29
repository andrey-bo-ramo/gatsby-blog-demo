import { useState } from "react";

const useArray = (initialValue = []) => {
  const [value, setValue] = useState(initialValue);
  const [allPostsIds, setAllPostsIds] = useState([]);
  const [allNewestPostsIds, setAllNewestPostsIds] = useState([]);
  const [allFeaturedPostsIds, setAllFeaturedPostsIds] = useState([]);
  const [allNewestFeaturedPostsIds, setAllNewestFeaturedPostsIds] = useState(
    []
  );

  const getPosts = () => {
    const arr = [...value];
    const sortedArr = [...value].sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      return 0;
    });
    const all = {};
    const postsIds = [];
    const featuredIds = [];
    const newestIds = [];
    const newestFeaturedIds = [];
    arr.forEach((item) => {
      all[item.id] = { ...item };
      postsIds.push(item.id);
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
    setAllPostsIds(postsIds);
    setAllFeaturedPostsIds(featuredIds);
    setAllNewestPostsIds(newestIds);
    setAllNewestFeaturedPostsIds(newestFeaturedIds);
    return { all, postsIds };
  };

  const getFilteredPosts = (key, isFiltered) => {
    let allPosts = [];
    let sortedPosts = [];
    if (key === "featured") {
      if (isFiltered) {
        allPosts = allNewestPostsIds;
        sortedPosts = allNewestFeaturedPostsIds;
      } else {
        allPosts = allPostsIds;
        sortedPosts = allFeaturedPostsIds;
      }
    }
    if (key === "newest") {
      if (isFiltered) {
        allPosts = allFeaturedPostsIds;
        sortedPosts = allNewestFeaturedPostsIds;
      } else {
        allPosts = allPostsIds;
        sortedPosts = allNewestPostsIds;
      }
    }
    return { allPosts, sortedPosts };
  };

  return { value, setValue, getPosts, getFilteredPosts };
};

export default useArray;
