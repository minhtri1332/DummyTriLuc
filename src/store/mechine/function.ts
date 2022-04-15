import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";

export const requestConnectMachine = async (code: string) => {
  const params = JSON.stringify({
    machine_id: code,
  });
  const { data } = await Fetch.put(
    `${LocaleServiceUrl.getUrl()}/machine/connect`,
    params
  );
  return data.data;
};
