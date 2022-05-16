import React, { memo, useCallback } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";

interface Props {
  label: string;
  value: string;
  keyName: string;
  disable: boolean;
  onChangeText: (keyName: string, value: string) => void;
}

const TextInputLine = memo(
  ({ label, value = "", keyName, disable, onChangeText }: Props) => {
    const onChange = useCallback(
      (text: string) => {
        onChangeText && onChangeText(keyName, text);
      },
      [keyName, onChangeText]
    );
    return (
      <View style={{ flexDirection: "row" }}>
        <SText>{label}</SText>
        <STextInput
          onChangeText={onChange}
          style={styles.input}
          value={value}
          editable={disable}
          isEdit={disable}
          selectionColor={Colors.colorText}
        />
      </View>
    );
  }
);

export default TextInputLine;

const SText = styled.Text`
  color: ${Colors.colorText};
  flex: 0.4;
  margin-left: 16px;
  margin-top: 4px;
  justify-content: center;
  align-self: center;
`;
const STextInput = styled.TextInput<{ isEdit: boolean }>`
  color: ${Colors.colorText};
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isEdit ? Colors.grey5 : Colors.colorTab};
`;

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingTop: 6,
    marginRight: 16,
  },
});
