import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const CollectionScreen = ({ navigation }) => {
  const { capturedPokemon, favorites, isFavorite } = usePokemonStore();

  const renderPokemon = ({ item }) => {
    const estFavori = isFavorite(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.pokemonCard}
        onPress={() => navigation.navigate('DetailPokemon', { pokemon: item })}
      >
        <Image 
          source={{ uri: item.sprites?.front_default }} 
          style={styles.pokemonImage}
        />
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Text style={styles.pokemonId}>#{item.id}</Text>
          {estFavori && (
            <View style={styles.favoriteBadge}>
              <Text style={styles.favoriteText}>❤️ Favori</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (capturedPokemon.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Collection vide</Text>
        <Text style={styles.emptyText}>
          Vous n'avez pas encore capturé de Pokémon.
        </Text>
        <Text style={styles.emptyText}>
          Explorez la liste pour en capturer !
        </Text>
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate('ListePokemon')}
        >
          <Text style={styles.exploreButtonText}>Explorer les Pokémon</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma Collection</Text>
        <Text style={styles.subtitle}>
          {capturedPokemon.length} Pokémon capturés
        </Text>
        <Text style={styles.subtitle}>
          {favorites.length} favoris
        </Text>
      </View>
      
      <FlatList
        data={capturedPokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  exploreButton: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  listContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  
  pokemonCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  pokemonImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  
  pokemonInfo: {
    alignItems: 'center',
  },
  
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  
  pokemonId: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  
  favoriteBadge: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  
  favoriteText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CollectionScreen;
