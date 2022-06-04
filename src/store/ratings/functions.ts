import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import { RawRatings } from "@/store/ratings/types";
import { batch } from "react-redux";
import { setRatingsQueries, syncRatings } from "@/store/ratings/index";

export const requestListMyRating = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/leader-board/current-rank`,
    {}
  );

  batch(() => {
    syncRatings([data]);
    setRatingsQueries({
      me: data,
    });
  });
  return data;
};

export const requestListAllRatings = async () => {
  const { data } = await Fetch.get<{
    list_leader_board_response: RawRatings[];
  }>(`${LocaleServiceUrl.getUrl()}/leader-board`, {});

  console.log("ad", data);
  batch(() => {
    syncRatings(data?.list_leader_board_response);
    setRatingsQueries({
      all: (data?.list_leader_board_response || []).map((item) => item.user_id),
    });
  });
  return data?.list_leader_board_response || [];
};
