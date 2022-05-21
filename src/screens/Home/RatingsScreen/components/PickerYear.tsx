import React, { memo, useCallback, useMemo, useState } from "react";
import { InteractionManager, View, ViewStyle } from "react-native";
import { styled } from "@/global";

interface Props {
  containerStyle?: ViewStyle;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const ContainerButton = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`;

const ItemDate = styled.TouchableOpacity<{
  index: number;
  selectedValue: boolean;
}>`
  width: 60px;
  height: 36px;
  border-left-width: ${(p) => (p.index === 0 ? 0 : 1)}px;
  border-left-color: #007aff;
  background-color: ${(p) => (p.selectedValue ? "#2CB978" : "#F5F5F5")};
  align-content: center;
  justify-content: center;
`;

const TextDate = styled.Text<{ active: boolean }>`
  font-size: 15px;
  color: ${(p) => (p.active ? "#fff" : "#242424")};
  text-align: center;
  font-family: Roboto-Medium;
`;

export const PickerYear = memo(function PickerYear({
  selectedValue,
  containerStyle,
  onValueChange,
}: Props) {
  const [visible, setVisible] = useState(false);

  const hideMenu = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const onSelectOptionCb = useCallback(
    (_value: string) => {
      onValueChange(_value);
      hideMenu();
    },
    [onValueChange, hideMenu]
  );

  const options = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [
      {
        value: "all",
        label: "All",
      },
      {
        value: `${currentYear}`,
        label: `${currentYear}`,
      },
      {
        value: `${currentYear - 1}`,
        label: `${currentYear - 1}`,
      },
      {
        value: `${currentYear - 2}`,
        label: `${currentYear - 2}`,
      },
    ];
  }, []);

  return (
    <View style={containerStyle}>
      <ContainerButton>
        {options.map((item, index) => {
          return (
            <ItemDate
              activeOpacity={0.9}
              onPress={() => {
                InteractionManager.runAfterInteractions(() => {
                  onSelectOptionCb(item.value);
                });
              }}
              index={index}
              selectedValue={item.value === selectedValue}
            >
              <TextDate active={item.value === selectedValue}>
                {item.label}
              </TextDate>
            </ItemDate>
          );
        })}
      </ContainerButton>
    </View>
  );
});
