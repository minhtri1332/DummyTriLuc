import React from 'react';
import {Provider} from 'react-redux';
// @ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/Routers';
import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

const App = () => {
  return (
    <Provider store={require('@/store').default}>
      <PersistGate persistor={require('@/store').persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
