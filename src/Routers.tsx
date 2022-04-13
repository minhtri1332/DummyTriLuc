import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import React, {memo} from 'react';
import {navigationRef} from '@/ultils/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home';
import PreloadScreen from '@/screens/LoginScreen/PreloadScreen';
import {CustomTabBar, TabBarIcon} from '@/componens/CustomTabBar';
import {
  IC_HOME,
  IC_HOME_ACTIVE,
  IC_PRACTICE,
  IC_PRACTICE_ACTIVE,
} from '@/assets';
import PracticeScreen from '@/screens/Practice/PracticeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const RootStack = createNativeStackNavigator();
const MainAndModalStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const TabBarStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

const TabBarStackComponent = memo(function TabBarStackComponent() {
  return (
    <TabBarStack.Navigator
      initialRouteName={'Home1'}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
      detachInactiveScreens={false}>
      <TabBarStack.Screen
        name="tab_bar.Home"
        component={HomeScreen}
        options={{
          title: 'tab_bar.Home',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_HOME_ACTIVE : IC_HOME}
            />
          ),
        }}
      />
      <TabBarStack.Screen
        name="tab_bar.practice"
        component={PracticeScreen}
        options={{
          title: 'tab_bar.practice',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_PRACTICE_ACTIVE : IC_PRACTICE}
            />
          ),
        }}
      />
    </TabBarStack.Navigator>
  );
});

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'TabBar'}>
      <DrawerStack.Screen name={'TabBar'} component={TabBarStackComponent} />
      {/*<TabBarStack.Screen name="TabBar" component={HomeScreen} />*/}
    </DrawerStack.Navigator>
  );
});

export const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <MainAndModalStack.Navigator
      screenOptions={{headerShown: false, presentation: 'modal'}}
      initialRouteName={'Main'}>
      <MainAndModalStack.Screen name={'Main'} component={MainStackComponent} />
    </MainAndModalStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" />
      <>
        <RootStack.Navigator
          initialRouteName={'Preload'}
          screenOptions={{headerShown: false}}>
          <RootStack.Screen name={'Preload'} component={PreloadScreen} />
          <RootStack.Screen name={'Main'} component={ModalStackComponent} />
        </RootStack.Navigator>
      </>
    </NavigationContainer>
  );
});

export default Routes;
