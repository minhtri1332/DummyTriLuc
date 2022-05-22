import React, {FunctionComponent} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface OwnProps {
  containerStyle?: ViewStyle;
}

type Props = OwnProps;

const SActivityIndicator = styled(ActivityIndicator).attrs((props) => ({
  color: props.theme.grey1,
}))``;

const LoadingView: FunctionComponent<Props> = (props) => {
  return (
    <View style={StyleSheet.flatten([styles.container, props.containerStyle])}>
      <SActivityIndicator />
    </View>
  );
};

const MemoLoadingView = React.memo(LoadingView);
export {MemoLoadingView as LoadingView};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
});
