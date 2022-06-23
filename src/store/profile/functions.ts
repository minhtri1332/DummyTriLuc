import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import { syncProfile } from "@/store/profile/index";

export const requestEditProfile = async (paramProfile: any) => {
  const form = new FormData();
  form.append("avatar", paramProfile.avatar);
  form.append("height", paramProfile.height);
  form.append("weight", paramProfile.weight);
  form.append("sex", paramProfile.sex);
  form.append("date_of_birth", paramProfile.date_of_birth);

  const { data } = await Fetch.put(
    `${LocaleServiceUrl.getUrl()}/user/user-profile`,
    form
  );

  await requestGetProfile();

  return data.data;
};

export const requestGetProfile = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/user/user-profile`,
    {}
  );
  const value = { id: "0", ...data };
  syncProfile([value]);
  return data;
};
