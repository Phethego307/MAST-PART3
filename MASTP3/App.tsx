import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootTabs';
import { MenuProvider } from './src/context/MenuContext';
import 'react-native-get-random-values';




export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </MenuProvider>
  );
}


