import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles/globalStyles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Ionicons name="warning" size={64} color={colors.warning} />
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            The app encountered an unexpected error. Please try restarting the app.
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.centerContainer,
    backgroundColor: colors.light,
    padding: 32,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  
  message: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  
  retryButton: {
    ...globalStyles.button,
    paddingHorizontal: 32,
  },
  
  retryButtonText: {
    ...globalStyles.buttonText,
  },
});

export default ErrorBoundary;
