import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { styled, useAsyncFn } from "@/global";
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from "@/componens/BottomMenu";
import { InteractionManager, ScrollView, StyleSheet } from "react-native";
import { screenShortDimension } from "@/ultils/scale";
import {
  IMG_BACKGROUND_ACCORDING_LED,
  IMG_BACKGROUND_FREE_FIGHT,
} from "@/assets";
import { Colors } from "@/themes/Colors";
import ToastService from "@/services/ToastService";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";
import { navigateToPracticingScreen } from "@/ultils/navigation";
import { SelectModalBottom } from "@/componens/ViewBorder/SelectModalBottom";
import { FilterBoxOption } from "@/componens/types";
import LocalStorageHelper from "@/services/LocalServiceHelper";

interface PracticingBottomProps {
  isVisible: boolean;
  hideMenu: () => void;
  listMachineId: string;
}

export const PracticingBottomModal = memo(function PracticingBottomModal({
  isVisible,
  hideMenu,
  listMachineId,
}: PracticingBottomProps) {
  const machineId = MachineIdService.getMachineId();
  const [{ loading }, onPressFreeFight] = useAsyncFn(async () => {
    // await requestConnectMachineHitMode(machineId, "5");
    hideMenu();
    InteractionManager.runAfterInteractions(() => {
      navigateToPracticingScreen();
    });
  }, [hideMenu, machineId]);

  const onPressAccordingLed = useCallback(() => {
    ToastService.show("Coming soon");
  }, []);

  // const getMachineIds = useMemo(() => {
  //   let listFilterModel: FilterBoxOption[] = [];
  //   (listMachineId || []).map((item) => {
  //     listFilterModel.push({
  //       label: `Mã máy tập : ${item}`,
  //       value: item,
  //     });
  //   });
  //   return listFilterModel;
  // }, [listMachineId]);

  const onConnectMachine = useMemo(() => {
    if (machineId == "") {
      return "Chưa kết nối máy tập";
    }
    return "Sẵn sàng kết nối mã máy tập: " + machineId;
  }, [machineId]);

  return (
    <ScreenWrapper>
      <BottomMenuModal
        isVisible={isVisible}
        onClose={hideMenu}
        propagateSwipe={true}
      >
        <BottomMenuContainer>
          <BottomMenuHeader
            noDivider={true}
            title={"Chọn kiểu đánh"}
            onClose={hideMenu}
            onPressRight={hideMenu}
          />
          <ScrollView style={styles.maxHeightScroll}>
            {/*<SSelectModalBottom*/}
            {/*  label={"Máy tập"}*/}
            {/*  options={getMachineIds}*/}
            {/*  inputName={"codeId"}*/}
            {/*  placeholder={"Lựa chọn"}*/}
            {/*  selectedValue={machineId}*/}
            {/*  onSelectOption={(keyName, value) => setMachineId(String(value))}*/}
            {/*/>*/}
            <STextName>{onConnectMachine}</STextName>
            <SViewItemStyleFight onPress={onPressFreeFight}>
              <SViewBackgroundItem source={IMG_BACKGROUND_FREE_FIGHT} />
              <SViewContainerText>
                <SViewTextItem>Đánh tự do</SViewTextItem>
                <SViewSubTextItem>Free fight</SViewSubTextItem>
              </SViewContainerText>
            </SViewItemStyleFight>
            <SViewItemStyleFight onPress={onPressAccordingLed}>
              <SViewBackgroundItem source={IMG_BACKGROUND_ACCORDING_LED} />
              <SViewContainerText>
                <SViewTextItem>Đánh theo Led</SViewTextItem>
                <SViewSubTextItem>According to led</SViewSubTextItem>
              </SViewContainerText>
            </SViewItemStyleFight>
          </ScrollView>
        </BottomMenuContainer>
      </BottomMenuModal>
    </ScreenWrapper>
  );
});

export default PracticingBottomModal;

const SSelectModalBottom = styled(SelectModalBottom).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SViewItemStyleFight = styled.TouchableOpacity`
  margin: 16px 16px;
  height: 150px;
  border-width: 1px;
  border-color: ${Colors.red1};
`;
const SViewContainerText = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
`;
const STextName = styled.Text`
  color: ${Colors.white};
  padding: 16px;
`;

const SViewBackgroundItem = styled.Image`
  width: 100%;
  height: 148px;
  border-radius: 4px;
  position: absolute;
`;

const SViewTextItem = styled.Text`
  font-family: Roboto-Medium;
  color: ${Colors.white};
  font-size: 35px;
`;
const SViewSubTextItem = styled.Text`
  color: ${Colors.white};
  align-self: center;
  font-size: 20px;
`;

const styles = StyleSheet.create({
  portrait: {
    width: "100%",
  },
  landscape: {
    width: "100%",
    maxHeight: screenShortDimension,
  },
  fullScreen: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
  },
  maxHeightScroll: {
    maxHeight: "100%",
  },
});
