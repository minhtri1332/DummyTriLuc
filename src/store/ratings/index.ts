import { createDynamicReducer } from "@/ultils/createDynamicReducer";
import { RawRatings } from "@/store/ratings/types";

const { setStore, reducer, sync, useByKey, setQueries, useKeysByQuery } =
  createDynamicReducer<RawRatings>("ratings", "user_id");

export const setRatingsStore = setStore;
export const ratingsReducer = reducer;
export const syncRatings = sync;
export const useRatings = useByKey;
export const setRatingsQueries = setQueries;
export const useRatingsByQuery = useKeysByQuery;

export const myRating = () => {
  const me = useRatingsByQuery("me");
  return me;
};
