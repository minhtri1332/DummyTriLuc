import React, {useCallback, useEffect, useMemo} from 'react';
import {Provider} from 'react-redux';
// @ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/Routers';
import {enableFreeze} from 'react-native-screens';
import notifee from '@notifee/react-native';
import _ from "lodash";
import ToastService from "./src/services/ToastService";
import messaging from '@react-native-firebase/messaging';

enableFreeze(true);

const App = () => {
    useEffect(() => {
        notification().then();
    }, []);

    const createNotification = useCallback(
        async (title: string, value: string) => {
            // Create a channel
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            await notifee.displayNotification({
                title: title || '',
                body: value || '',
                android: {
                    channelId,
                },
            });
        },
        [],
    );

    const showToast = useMemo(
        () =>
            _.debounce((title, body) => {
                ToastService.show(`${title} ${body}`);
            }, 1000),
        [],
    );

    const notification = useCallback(async () => {
        await requestUserPermission();
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            await createNotification(
                remoteMessage.notification?.title || '',
                remoteMessage.notification?.body || '',
            ).then();
            showToast(
                remoteMessage.notification?.title || '',
                remoteMessage.notification?.body,
            );

            //await requestMessageCheckin(remoteMessage.data?.boxID || '');
        });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            await createNotification(
                remoteMessage.notification?.title || '',
                remoteMessage.notification?.body || '',
            ).then();
            showToast(
                remoteMessage.notification?.title || '',
                remoteMessage.notification?.body,
            );
            //  await requestMessageCheckin(remoteMessage.data?.boxID || '');
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });
        return unsubscribe;
    }, []);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();

        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

  return (
    <Provider store={require('@/store').default}>
      <PersistGate persistor={require('@/store').persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
