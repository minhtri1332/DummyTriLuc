import React, {memo, useEffect} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavigationService from '@/services/NavigationService';
import {ScreenWrapper} from '@/common/CommonStyles';
import {LoginForm} from '@/screens/LoginScreen/LoginForm';
import {fScale, fTabletScale, screenShortDimension} from '@/ultils/scale';
import {styled} from '@/global';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {isTablet} from 'react-native-device-info';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {Logo} from '@/screens/LoginScreen/components/Logo';
import {useSetupLanguage} from '@/languages';

const HEIGHT_IN_PORTRAIT = isTablet()
  ? fScale(80)
  : screenShortDimension <= 320
  ? 13
  : 43;

export const PreloadScreen = memo(function PreloadScreen() {
  const orientation = useDeviceOrientation();
  useSetupLanguage();
  const navigation: any = useNavigation();
  useEffect(() => {
    NavigationService.navigator = navigation;
  }, [navigation]);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <UpperContainer>
          <Spacer landscape={orientation.landscape} />
          <Logo />
          <Spacer landscape={orientation.landscape} />
          <LoginForm />
        </UpperContainer>
      </ScrollView>
    </ScreenWrapper>
  );
});

export default PreloadScreen;

const UpperContainer = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;

const Spacer = styled.View<{landscape: boolean}>`
  height: ${() =>
    HEIGHT_IN_PORTRAIT +
    (Platform.OS === 'ios' ? getStatusBarHeight(true) : 0)}px;
  width: 100%;
`;

const styles = StyleSheet.create({
  scrollView: {
    flex: 12,
    width: '100%',
  },
  scrollViewContent: {
    minHeight: '100%',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: '100%',
    marginTop: fTabletScale(42),
  },
});
