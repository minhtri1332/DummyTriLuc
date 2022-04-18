import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";

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

export const requestHitsStatistic = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/hits/hits-statistic`,
    {}
  );
  return data;
};
