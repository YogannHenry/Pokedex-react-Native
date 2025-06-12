import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles/globalStyles';
import { usePokemonStore } from '../store/pokemonStore';
import { 
  capitalize, 
  formatPokemonId, 
  formatHeight, 
  formatWeight, 
  formatStatName,
  getTypeColor 
} from '../utils/helpers';

const PokemonDetailScreen = ({ route, navigation }) => {
  const { pokemon } = route.params;
  const [loading, setLoading] = useState(false);

  // Zustand store
  const { 
    isPokemonCaptured, 
    addCapturedPokemon, 
    removeCapturedPokemon,
    toggleFavorite,
    isFavorite
  } = usePokemonStore();

  const captured = isPokemonCaptured(pokemon.id);
  const favorite = isFavorite(pokemon.id);

  const toggleCapture = async () => {
    setLoading(true);
    try {
      if (captured) {
        const success = await removeCapturedPokemon(pokemon.id);
        if (success) {
          Alert.alert('Released', `${capitalize(pokemon.name)} has been released.`);
        }
      } else {
        const success = await addCapturedPokemon(pokemon);
        if (success) {
          Alert.alert('Captured!', `${capitalize(pokemon.name)} has been added to your collection!`);
        }
      }
    } catch (error) {
      console.error('Error toggling capture:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(pokemon.id);
  };

  const getStatBarWidth = (statValue) => {
    const maxStat = 255; // Maximum possible stat value
    return `${Math.min((statValue / maxStat) * 100, 100)}%`;
  };

  const getStatBarColor = (statValue) => {
    if (statValue >= 120) return colors.success;
    if (statValue >= 80) return colors.warning;
    return colors.danger;
  };

  return (
    <ScrollView style={globalStyles.container}>
      {/* Header with Pokémon image and basic info */}
      <View style={styles.header}>
        <View style={styles.basicInfo}>
          <View style={styles.topRow}>
            <Text style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</Text>
            <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
              <Ionicons 
                name={favorite ? "heart" : "heart-outline"} 
                size={24} 
                color={favorite ? colors.danger : colors.gray} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.pokemonName}>{capitalize(pokemon.name)}</Text>
          
          <View style={styles.types}>
            {pokemon.types.map((typeInfo, index) => (
              <View 
                key={index} 
                style={[styles.typeChip, { backgroundColor: getTypeColor(typeInfo.type.name) }]}
              >
                <Text style={styles.typeText}>{capitalize(typeInfo.type.name)}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <Image
          source={{ 
            uri: pokemon.sprites?.front_default || 
                 pokemon.sprites?.other?.['official-artwork']?.front_default 
          }}
          style={styles.pokemonImage}
        />
      </View>

      {/* Physical characteristics */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Physical Characteristics</Text>
        <View style={styles.physicalStats}>
          <View style={styles.physicalStat}>
            <Text style={styles.physicalLabel}>Height</Text>
            <Text style={styles.physicalValue}>{formatHeight(pokemon.height)}</Text>
          </View>
          <View style={styles.physicalStat}>
            <Text style={styles.physicalLabel}>Weight</Text>
            <Text style={styles.physicalValue}>{formatWeight(pokemon.weight)}</Text>
          </View>
        </View>
      </View>

      {/* Base Stats */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Base Stats</Text>
        {pokemon.stats.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statName}>{formatStatName(stat.stat.name)}</Text>
            <View style={styles.statBarContainer}>
              <View 
                style={[
                  styles.statBar, 
                  { 
                    width: getStatBarWidth(stat.base_stat),
                    backgroundColor: getStatBarColor(stat.base_stat)
                  }
                ]} 
              />
            </View>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
        
        <View style={styles.totalStats}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
          </Text>
        </View>
      </View>

      {/* Abilities */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Abilities</Text>
        {pokemon.abilities.map((abilityInfo, index) => (
          <View key={index} style={styles.abilityRow}>
            <Text style={styles.abilityName}>
              {capitalize(abilityInfo.ability.name.replace('-', ' '))}
            </Text>
            {abilityInfo.is_hidden && (
              <Text style={styles.hiddenAbility}>(Hidden)</Text>
            )}
          </View>
        ))}
      </View>

      {/* Sprites */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Sprites</Text>
        <View style={styles.spritesContainer}>
          {pokemon.sprites.front_default && (
            <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
          )}
          {pokemon.sprites.back_default && (
            <Image source={{ uri: pokemon.sprites.back_default }} style={styles.sprite} />
          )}
          {pokemon.sprites.front_shiny && (
            <Image source={{ uri: pokemon.sprites.front_shiny }} style={styles.sprite} />
          )}
          {pokemon.sprites.back_shiny && (
            <Image source={{ uri: pokemon.sprites.back_shiny }} style={styles.sprite} />
          )}
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, captured ? styles.releaseButton : styles.captureButton]}
          onPress={toggleCapture}
          disabled={loading}
        >
          <Ionicons 
            name={captured ? "remove-circle" : "add-circle"} 
            size={24} 
            color={colors.white} 
          />
          <Text style={styles.actionButtonText}>
            {loading 
              ? (captured ? 'Releasing...' : 'Capturing...') 
              : (captured ? 'Release Pokémon' : 'Add to Collection')
            }
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  basicInfo: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  favoriteButton: {
    padding: 4,
  },
  
  pokemonId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray,
  },
  
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 12,
  },
  
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  typeChip: {
    ...globalStyles.typeChip,
    marginRight: 8,
  },
  
  typeText: {
    ...globalStyles.typeText,
  },
  
  pokemonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  
  physicalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  
  physicalStat: {
    alignItems: 'center',
  },
  
  physicalLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  
  physicalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  
  statName: {
    width: 100,
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
  },
  
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.light,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  
  statValue: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark,
  },
  
  totalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.light,
  },
  
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
  },
  
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  abilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  
  abilityName: {
    fontSize: 16,
    color: colors.dark,
    fontWeight: '500',
  },
  
  hiddenAbility: {
    fontSize: 14,
    color: colors.gray,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  
  spritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  
  sprite: {
    width: 80,
    height: 80,
    margin: 4,
    resizeMode: 'contain',
  },
  
  actionContainer: {
    padding: 16,
    marginBottom: 32,
  },
  
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  captureButton: {
    backgroundColor: colors.success,
  },
  
  releaseButton: {
    backgroundColor: colors.danger,
  },
  
  actionButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PokemonDetailScreen;
