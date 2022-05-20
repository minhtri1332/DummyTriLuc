import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import { setPracticeQueries } from "@/store/home";

export const requestListMyRating = async () => {
  const { data } = await Fetch.get<{}>(
    `${LocaleServiceUrl.getUrl()}/leader-board/current-rank`,
    {}
  );
  // console.log("data", data);
  //
  // setPracticeQueries({
  //   myRank: [data]
  // });
  return data;
};

export const requestListAllRatings = async () => {
  const { data } = await Fetch.get<{}>(
    `${LocaleServiceUrl.getUrl()}/leader-board`,
    {}
  );
  console.log("data", data);

  setPracticeQueries({
    all: [data],
  });
  return data;
};
