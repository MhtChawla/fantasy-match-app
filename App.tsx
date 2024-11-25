import React from "react"

import RootNavigation from "./src/navigation/RootNavigation";

// redux
import { Provider as ReduxProvider } from "react-redux";
// @ts-ignore // TO-DO: sort types later
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from './src/redux/store';
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App;
