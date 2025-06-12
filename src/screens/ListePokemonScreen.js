import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const ListePokemonScreen = ({ navigation }) => {
  const { 
    pokemonList, 
    loading, 
    loadPokemonList, 
    isPokemonCaptured 
  } = usePokemonStore();

  useEffect(() => {
    if (pokemonList.length === 0) {
      chargerPokemons();
    }
  }, []);

  const chargerPokemons = async () => {
    try {
      await loadPokemonList(50, 0); // Charger 50 Pokémon
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les Pokémon');
    }
  };

  const renderPokemon = ({ item }) => {
    const estCapture = isPokemonCaptured(item.id);
    
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
          {estCapture && (
            <View style={styles.capturedBadge}>
              <Text style={styles.capturedText}>Capturé</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Chargement des Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Pokémon</Text>
      <Text style={styles.subtitle}>{pokemonList.length} Pokémon disponibles</Text>
      
      <FlatList
        data={pokemonList}
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
    padding: 10,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#666',
  },
  
  listContainer: {
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
  
  capturedBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  
  capturedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ListePokemonScreen;
