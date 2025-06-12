import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centerContainer,
    backgroundColor: colors.light,
  },
  
  loadingText: {
    ...globalStyles.text,
    marginTop: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default LoadingScreen;
