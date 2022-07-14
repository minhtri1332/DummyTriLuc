import { Fetch } from "@/ultils/fetch";
import LocaleServiceUrl from "@/store/types";
import ToastService from "@/services/ToastService";
import MachineIdService from "@/services/MachineIdService";
import FirebaseTokenService from "@/services/FirebaseTokenService";

export const requestConnectMachine = async (machine_id: string) => {
  const params = JSON.stringify({
    machine_id: machine_id,
  });
  const { data } = await Fetch.post(
    `${LocaleServiceUrl.getUrl()}/machine/connect`,
    params
  );

  if (data) {
    await MachineIdService.change(machine_id);
    ToastService.show(data.message);
  }

  return data;
};
export const requestConnectMachineHitMode = async (
  machine_id: string,
  mode: string,
  timestamp: string
) => {
  const params = JSON.stringify({
    machine_id: machine_id,
    mode: mode,
    firebase_token: FirebaseTokenService.getFirebaseToken(),
    timestamp: timestamp,
  });

  const { data } = await Fetch.post(
    `${LocaleServiceUrl.getUrl()}/machine/hit-mode`,
    params
  );

  // if (data) {
  //   ToastService.show(data.message);
  // }

  return data;
};
