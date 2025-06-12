import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles/globalStyles';
import { usePokemonStore } from '../store/pokemonStore';
import { useCapturedPokemon, useFavorites, usePokemonList } from '../hooks/usePokemon';

const StoreTestScreen = ({ navigation }) => {
  // Utilisation directe du store
  const { 
    pokemonList, 
    capturedPokemon, 
    favorites, 
    loading, 
    error,
    initialize,
    clearError
  } = usePokemonStore();

  // Utilisation des hooks personnalisés
  const { capturedCount } = useCapturedPokemon();
  const { favoritesCount, toggleFavorite } = useFavorites();
  const { totalPokemon, loadPokemonList, searchPokemon, resetSearch } = usePokemonList();

  const handleInitialize = async () => {
    try {
      await initialize();
      Alert.alert('Success', 'Store initialized successfully!');
    } catch (error) {
      Alert.alert('Error', `Failed to initialize: ${error.message}`);
    }
  };

  const handleLoadPokemon = async () => {
    try {
      await loadPokemonList(10, 0);
      Alert.alert('Success', `Loaded ${pokemonList.length} Pokémon!`);
    } catch (error) {
      Alert.alert('Error', `Failed to load: ${error.message}`);
    }
  };

  const handleSearchPikachu = async () => {
    try {
      await searchPokemon('pikachu');
      Alert.alert('Success', 'Search completed!');
    } catch (error) {
      Alert.alert('Error', `Search failed: ${error.message}`);
    }
  };

  const handleToggleFavoritePikachu = () => {
    toggleFavorite(25); // Pikachu's ID
    Alert.alert('Success', 'Pikachu favorite status toggled!');
  };

  const getFirstPokemon = () => {
    return pokemonList.length > 0 ? pokemonList[0] : null;
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zustand Store Test</Text>
        <Text style={styles.subtitle}>Test des fonctionnalités du store</Text>
      </View>

      {/* État du store */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>État du Store</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Pokémon chargés:</Text>
          <Text style={styles.statValue}>{totalPokemon}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Pokémon capturés:</Text>
          <Text style={styles.statValue}>{capturedCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Favoris:</Text>
          <Text style={styles.statValue}>{favoritesCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Loading:</Text>
          <Text style={styles.statValue}>{loading ? 'Oui' : 'Non'}</Text>
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erreur: {error}</Text>
            <TouchableOpacity onPress={clearError} style={styles.clearErrorButton}>
              <Text style={styles.clearErrorText}>Effacer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Actions du store */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Actions</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleInitialize}>
          <Ionicons name="refresh" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Initialiser le Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLoadPokemon}>
          <Ionicons name="download" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Charger 10 Pokémon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSearchPikachu}>
          <Ionicons name="search" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Rechercher Pikachu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => resetSearch()}>
          <Ionicons name="close" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Reset Recherche</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleToggleFavoritePikachu}>
          <Ionicons name="heart" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Toggle Favori Pikachu</Text>
        </TouchableOpacity>
      </View>

      {/* Premier Pokémon */}
      {getFirstPokemon() && (
        <View style={globalStyles.card}>
          <Text style={globalStyles.subtitle}>Premier Pokémon</Text>
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonName}>{getFirstPokemon().name}</Text>
            <Text style={styles.pokemonId}>ID: {getFirstPokemon().id}</Text>
            <TouchableOpacity 
              style={styles.detailButton}
              onPress={() => navigation.navigate('PokemonDetail', { pokemon: getFirstPokemon() })}
            >
              <Text style={styles.detailButtonText}>Voir Détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Liste des favoris */}
      {favorites.length > 0 && (
        <View style={globalStyles.card}>
          <Text style={globalStyles.subtitle}>IDs des Favoris</Text>
          <Text style={styles.favoritesList}>
            {favorites.join(', ')}
          </Text>
        </View>
      )}

      {/* Navigation */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Navigation</Text>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('PokemonList')}
        >
          <Text style={styles.navButtonText}>Aller à la Liste</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.navButtonText}>Aller à la Collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 16,
    color: colors.gray,
  },
  
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  
  statLabel: {
    fontSize: 16,
    color: colors.dark,
  },
  
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  errorContainer: {
    backgroundColor: colors.danger + '20',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  errorText: {
    color: colors.danger,
    flex: 1,
  },
  
  clearErrorButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  clearErrorText: {
    color: colors.white,
    fontSize: 12,
  },
  
  actionButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  pokemonInfo: {
    alignItems: 'center',
  },
  
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    textTransform: 'capitalize',
  },
  
  pokemonId: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 12,
  },
  
  detailButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  
  detailButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  
  favoritesList: {
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
  },
  
  navButton: {
    backgroundColor: colors.light,
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  
  navButtonText: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StoreTestScreen;
