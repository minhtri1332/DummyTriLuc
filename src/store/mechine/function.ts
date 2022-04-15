import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";

export const requestGetProfile = async () => {
  const { data } = await Fetch.put(
    `${LocaleServiceUrl.getUrl()}/machine/connect`,
    {}
  );
  return data.data;
};
