import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SimpleAppNavigator from './src/navigation/SimpleAppNavigator';

export default function App() {
  return (
    <>
      <SimpleAppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
