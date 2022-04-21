import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import { paramFilterHit } from "@/screens/Home/HitScreen/HitStatisticScreen";

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

export const requestHitsStatistic = async (params: paramFilterHit) => {
  const { data } = await Fetch.get<{ list_hits: number[] }>(
    `${LocaleServiceUrl.getUrl()}/hits/hit-statistic`,
    {}
  );
  return data.list_hits;
};

export const requestStrengthStatistic = async (params: paramFilterHit) => {
  const { data } = await Fetch.get<{ list_strength: number[]; stat: number[] }>(
    `${LocaleServiceUrl.getUrl()}/hits/strength-statistic`,
    {}
  );

  return data;
};
