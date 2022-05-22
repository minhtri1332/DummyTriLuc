import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';
import {styled} from '@/global';

interface Props {}

const SActivityIndicator = styled(ActivityIndicator).attrs((props) => ({
  color: props.theme.grey1,
}))``;

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  padding-top: 50px;
`;

export const Loading = memo(function Loading(props: Props) {
  return (
    <Container>
      <SActivityIndicator />
    </Container>
  );
});
