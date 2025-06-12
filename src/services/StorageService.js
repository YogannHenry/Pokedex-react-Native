import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTION_KEY = '@pokemon_collection';

export const StorageService = {
  // Save a captured Pokémon to the collection
  async savePokemon(pokemon) {
    try {
      const collection = await this.getCollection();
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats,
        capturedAt: new Date().toISOString(),
      };
      
      // Check if Pokémon is already in collection
      const existingIndex = collection.findIndex(p => p.id === pokemon.id);
      if (existingIndex >= 0) {
        collection[existingIndex] = pokemonData;
      } else {
        collection.push(pokemonData);
      }
      
      await AsyncStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
      return true;
    } catch (error) {
      console.error('Error saving Pokémon:', error);
      return false;
    }
  },

  // Get the entire collection
  async getCollection() {
    try {
      const collection = await AsyncStorage.getItem(COLLECTION_KEY);
      return collection ? JSON.parse(collection) : [];
    } catch (error) {
      console.error('Error getting collection:', error);
      return [];
    }
  },

  // Alias pour compatibilité avec le store
  async getCapturedPokemon() {
    return this.getCollection();
  },

  // Check if a Pokémon is in the collection
  async isPokemonCaptured(pokemonId) {
    try {
      const collection = await this.getCollection();
      return collection.some(pokemon => pokemon.id === pokemonId);
    } catch (error) {
      console.error('Error checking if Pokémon is captured:', error);
      return false;
    }
  },

  // Remove a Pokémon from the collection
  async removePokemon(pokemonId) {
    try {
      const collection = await this.getCollection();
      const filteredCollection = collection.filter(pokemon => pokemon.id !== pokemonId);
      await AsyncStorage.setItem(COLLECTION_KEY, JSON.stringify(filteredCollection));
      return true;
    } catch (error) {
      console.error('Error removing Pokémon:', error);
      return false;
    }
  },

  // Get collection statistics
  async getCollectionStats() {
    try {
      const collection = await this.getCollection();
      return {
        total: collection.length,
        types: [...new Set(collection.flatMap(p => p.types.map(t => t.type.name)))],
        lastCaptured: collection.length > 0 ? collection[collection.length - 1] : null,
      };
    } catch (error) {
      console.error('Error getting collection stats:', error);
      return { total: 0, types: [], lastCaptured: null };
    }
  }
};
