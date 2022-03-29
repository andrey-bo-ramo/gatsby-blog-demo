import { useMemo } from "react";

const useSearchable = (data, searchText) => {
  return useMemo(() => {
    const regex = new RegExp(searchText, "i");
    return data.filter((item) => regex.test(item));
  }, [data, searchText]);
};

export default useSearchable;
