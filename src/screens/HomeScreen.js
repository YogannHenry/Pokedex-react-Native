import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles/globalStyles';
import { usePokemonStore } from '../store/pokemonStore';
import { PokeAPI } from '../services/PokeAPI';
import PokemonCard from '../components/PokemonCard';

const HomeScreen = ({ navigation }) => {
  const [featuredPokemon, setFeaturedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Zustand store
  const { capturedPokemon, loadCapturedPokemon, initialize } = usePokemonStore();

  // Calculer les stats de collection
  const collectionStats = {
    total: capturedPokemon.length,
    types: [...new Set(capturedPokemon.flatMap(p => p.types?.map(t => t.type.name) || []))],
    lastCaptured: capturedPokemon.length > 0 ? capturedPokemon[capturedPokemon.length - 1] : null
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        initialize(),
        loadFeaturedPokemon()
      ]);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedPokemon = async () => {
    try {
      // Get some popular Pokémon as featured
      const featuredIds = [25, 1, 4, 7, 150, 151]; // Pikachu, starters, Mewtwo, Mew
      const pokemonPromises = featuredIds.map(id => PokeAPI.getPokemonDetails(id));
      const pokemon = await Promise.all(pokemonPromises);
      setFeaturedPokemon(pokemon);
      return pokemon;
    } catch (error) {
      console.error('Error loading featured Pokémon:', error);
      return [];
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const navigateToPokemonDetail = (pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  if (loading) {
    return (
      <View style={globalStyles.loading}>
        <Text style={globalStyles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={globalStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to your Pokédex!</Text>
        <Text style={styles.welcomeText}>
          Discover, capture, and collect Pokémon from around the world.
        </Text>
      </View>

      {/* Collection Stats */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Your Collection</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{collectionStats.total}</Text>
            <Text style={styles.statLabel}>Captured</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{collectionStats.types.length}</Text>
            <Text style={styles.statLabel}>Types</Text>
          </View>
        </View>
        
        {collectionStats.lastCaptured && (
          <View style={styles.lastCaptured}>
            <Text style={styles.lastCapturedLabel}>Last Captured:</Text>
            <Text style={styles.lastCapturedName}>
              {collectionStats.lastCaptured.name}
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Capture')}
          >
            <Ionicons name="add-circle" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Capture Pokémon</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryAction]}
            onPress={() => navigation.navigate('PokemonList')}
          >
            <Ionicons name="list" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Browse All</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.testAction]}
            onPress={() => navigation.navigate('StoreTest')}
          >
            <Ionicons name="flask" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Test Zustand</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Pokémon */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Featured Pokémon</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.featuredList}>
            {featuredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onPress={() => navigateToPokemonDetail(pokemon)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
    ...globalStyles.card,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  welcomeText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  statLabel: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  
  lastCaptured: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.light,
    borderRadius: 8,
  },
  
  lastCapturedLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  
  lastCapturedName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    textTransform: 'capitalize',
  },
  
  actionButtons: {
    flexDirection: 'column',
    marginTop: 16,
    gap: 12,
  },
  
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  secondaryAction: {
    backgroundColor: colors.secondary,
  },

  testAction: {
    backgroundColor: colors.warning,
  },
  
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  featuredList: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

export default HomeScreen;
