import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { usePokemonList, useCapturedPokemon } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const PokemonListScreen = ({ navigation }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Zustand hooks
  const { 
    pokemonList, 
    loading, 
    error, 
    loadPokemonList: loadPokemonFromStore, 
    clearError 
  } = usePokemonList();
  
  const { isPokemonCaptured } = useCapturedPokemon();

  const LIMIT = 20;

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await loadPokemonFromStore(LIMIT, 0);
      setOffset(LIMIT);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadMorePokemon = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const response = await loadPokemonFromStore(LIMIT, offset);
      setOffset(offset + LIMIT);
      setHasMore(response?.next !== null);
    } catch (error) {
      console.error('Error loading more Pokémon:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const navigateToPokemonDetail = (pokemonData) => {
    navigation.navigate('PokemonDetail', { pokemon: pokemonData });
  };

  const renderPokemonCard = ({ item }) => (
    <PokemonCard
      pokemon={item}
      onPress={() => navigateToPokemonDetail(item)}
      showCapturedBadge={true}
      isCaptured={isPokemonCaptured(item.id)}
    />
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading more Pokémon...</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[globalStyles.text, styles.loadingText]}>
          Loading Pokémon...
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Pokémon</Text>
        <Text style={styles.headerSubtitle}>
          Showing {pokemonList.length} Pokémon
        </Text>
      </View>
      
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id?.toString() || item.name}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
  },
  
  headerSubtitle: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 4,
  },
  
  listContent: {
    padding: 8,
  },
  
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  
  loadingText: {
    marginTop: 8,
    color: colors.gray,
  },
});

export default PokemonListScreen;
