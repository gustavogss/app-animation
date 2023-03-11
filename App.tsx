import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Home} from './src/screens/Home';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1 }}>
      <Home />
    </GestureHandlerRootView>
  ); 
}


