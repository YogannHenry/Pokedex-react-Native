import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors } from '../styles/globalStyles';
import { PokeAPI } from '../services/PokeAPI';
import { StorageService } from '../services/StorageService';
import { 
  capitalize, 
  formatPokemonId, 
  getTypeColor, 
  calculateCaptureRate,
  getRandomCatchPhrase,
  getCaptureResultMessage 
} from '../utils/helpers';

const CaptureScreen = ({ navigation }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [captureRate, setCaptureRate] = useState(0);
  const [isAlreadyCaptured, setIsAlreadyCaptured] = useState(false);
  const [pokemonAnimation] = useState(new Animated.Value(1));
  const [pokemonOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    findNewPokemon();
  }, []);

  const findNewPokemon = async () => {
    setLoading(true);
    try {
      const pokemon = await PokeAPI.getRandomPokemon();
      setCurrentPokemon(pokemon);
      setCaptureRate(calculateCaptureRate(pokemon));
      
      const captured = await StorageService.isPokemonCaptured(pokemon.id);
      setIsAlreadyCaptured(captured);
      
      // Animate Pokémon appearance
      pokemonAnimation.setValue(0);
      pokemonOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(pokemonAnimation, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(pokemonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      
    } catch (error) {
      console.error('Error finding new Pokémon:', error);
      Alert.alert('Error', 'Failed to find a new Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const attemptCapture = async () => {
    if (!currentPokemon || capturing) return;
    
    setCapturing(true);
    
    // Animate capture attempt
    Animated.sequence([
      Animated.timing(pokemonAnimation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pokemonAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pokemonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Simulate capture delay
    setTimeout(async () => {
      const success = Math.random() * 100 < captureRate;
      const message = getCaptureResultMessage(success, currentPokemon.name);
      
      if (success) {
        await StorageService.savePokemon(currentPokemon);
        setIsAlreadyCaptured(true);
        
        // Success animation
        Animated.timing(pokemonOpacity, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }).start();
        
        Alert.alert(
          'Success!',
          message,
          [
            { text: 'View Details', onPress: () => viewPokemonDetails() },
            { text: 'Find Another', onPress: findNewPokemon },
          ]
        );
      } else {
        // Failure animation
        Animated.sequence([
          Animated.timing(pokemonAnimation, {
            toValue: 1.1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(pokemonAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
        
        Alert.alert('Oh no!', message, [
          { text: 'Try Again', onPress: () => {} },
          { text: 'Find Another', onPress: findNewPokemon },
        ]);
      }
      
      setCapturing(false);
    }, 1500);
  };

  const viewPokemonDetails = () => {
    navigation.navigate('Home', {
      screen: 'PokemonDetail',
      params: { pokemon: currentPokemon }
    });
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.text}>Searching for Pokémon...</Text>
      </View>
    );
  }

  if (!currentPokemon) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.text}>No Pokémon found</Text>
        <TouchableOpacity style={globalStyles.button} onPress={findNewPokemon}>
          <Text style={globalStyles.buttonText}>Search Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.encounterCard}>
        <Text style={styles.encounterTitle}>{getRandomCatchPhrase()}</Text>
        
        <Animated.View 
          style={[
            styles.pokemonContainer,
            {
              transform: [{ scale: pokemonAnimation }],
              opacity: pokemonOpacity,
            }
          ]}
        >
          <Image
            source={{ 
              uri: currentPokemon.sprites?.front_default || 
                   currentPokemon.sprites?.other?.['official-artwork']?.front_default 
            }}
            style={styles.pokemonImage}
          />
        </Animated.View>
        
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonId}>{formatPokemonId(currentPokemon.id)}</Text>
          <Text style={styles.pokemonName}>{capitalize(currentPokemon.name)}</Text>
          
          <View style={styles.types}>
            {currentPokemon.types.map((typeInfo, index) => (
              <View 
                key={index} 
                style={[styles.typeChip, { backgroundColor: getTypeColor(typeInfo.type.name) }]}
              >
                <Text style={styles.typeText}>{capitalize(typeInfo.type.name)}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.captureInfo}>
          <View style={styles.captureRateContainer}>
            <Text style={styles.captureRateLabel}>Capture Rate</Text>
            <Text style={styles.captureRateValue}>{captureRate}%</Text>
          </View>
          
          {isAlreadyCaptured && (
            <View style={styles.capturedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.capturedText}>Already Captured</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.captureButton, capturing && styles.disabledButton]}
          onPress={attemptCapture}
          disabled={capturing}
        >
          <Ionicons 
            name="radio-button-off" 
            size={24} 
            color={colors.white} 
          />
          <Text style={styles.captureButtonText}>
            {capturing ? 'Capturing...' : 'Throw Pokéball'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={findNewPokemon}
          disabled={capturing}
        >
          <Ionicons name="refresh" size={24} color={colors.primary} />
          <Text style={styles.skipButtonText}>Find Another</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.detailButton}
          onPress={viewPokemonDetails}
        >
          <Ionicons name="information-circle" size={24} color={colors.secondary} />
          <Text style={styles.detailButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  encounterCard: {
    ...globalStyles.card,
    alignItems: 'center',
    margin: 16,
    paddingVertical: 32,
  },
  
  encounterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  
  pokemonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  pokemonImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  
  pokemonInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  pokemonId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray,
    marginBottom: 4,
  },
  
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  types: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  
  typeChip: {
    ...globalStyles.typeChip,
    marginHorizontal: 4,
  },
  
  typeText: {
    ...globalStyles.typeText,
  },
  
  captureInfo: {
    alignItems: 'center',
    width: '100%',
  },
  
  captureRateContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  
  captureRateLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  
  captureRateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  capturedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  
  capturedText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  
  captureButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  disabledButton: {
    backgroundColor: colors.gray,
  },
  
  captureButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  skipButton: {
    ...globalStyles.outlineButton,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  skipButtonText: {
    ...globalStyles.outlineButtonText,
    marginLeft: 8,
  },
  
  detailButton: {
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  detailButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CaptureScreen;
