import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import { paramFilter } from "@/screens/Home/components/TabHeaderSelectTime";

export interface RawDataGoal {
  total_hits: number;
  goal: number;
}

export interface RawDataStrengthGoal {
  strength: number;
  strength_goal: number;
  list_point: number[];
}

export const requestHitGoal = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/hits/hit-goal`,
    {}
  );

  return data;
};

export const requestStrengthGoal = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/hits/strength-goal`,
    {}
  );
  return data;
};

export const requestHitsStatistic = async (params: paramFilter) => {
  const { data } = await Fetch.get<{ list_hits: [] }>(
    `${LocaleServiceUrl.getUrl()}/hits/hit-statistic`,
    { params: params }
  );

  return data.list_hits;
};

export const requestStrengthStatistic = async (params: paramFilter) => {
  const { data } = await Fetch.get<{ list_strength: []; stat: [] }>(
    `${LocaleServiceUrl.getUrl()}/hits/strength-statistic`,
    { params: params }
  );

  return data;
};
