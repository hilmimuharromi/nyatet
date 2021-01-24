import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from "~/stores"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from "~/routes"
import RNBootSplash from "react-native-bootsplash";
const App = () => {

  useEffect(() => {
    // Hide SplashScreen after 3secs or Make an async task
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  )
}

export default App