import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AppNavigator />
      <StatusBar style="auto" />
    </ErrorBoundary>
  );
}
