import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/globalStyles';
import { StorageService } from '../services/StorageService';
import PokemonCard from '../components/PokemonCard';

const CollectionScreen = ({ navigation }) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCollection();
    }, [])
  );

  const loadCollection = async () => {
    try {
      setLoading(true);
      const capturedPokemon = await StorageService.getCollection();
      setCollection(capturedPokemon.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCollection();
    setRefreshing(false);
  };

  const navigateToPokemonDetail = (pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  const renderPokemonCard = ({ item }) => (
    <PokemonCard
      pokemon={item}
      onPress={() => navigateToPokemonDetail(item)}
      showCapturedBadge={true}
      isCaptured={true}
    />
  );

  if (loading) {
    return (
      <View style={globalStyles.loading}>
        <Text style={globalStyles.text}>Loading your collection...</Text>
      </View>
    );
  }

  if (collection.length === 0) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={styles.emptyTitle}>No Pokémon Captured Yet</Text>
        <Text style={styles.emptyText}>
          Start your adventure by capturing your first Pokémon!
        </Text>
        <Text style={styles.emptyHint}>
          Go to the Capture tab to find and catch Pokémon.
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Collection</Text>
        <Text style={styles.headerSubtitle}>
          {collection.length} Pokémon captured
        </Text>
      </View>
      
      <FlatList
        data={collection}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 32,
  },
  
  emptyHint: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 32,
  },
});

export default CollectionScreen;
