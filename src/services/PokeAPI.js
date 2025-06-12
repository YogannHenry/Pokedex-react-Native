const BASE_URL = 'https://pokeapi.co/api/v2';

export const PokeAPI = {
  // Get a list of Pokémon with pagination
  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  },

  // Get detailed information about a specific Pokémon
  async getPokemonDetail(nameOrId) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon detail:', error);
      throw error;
    }
  },

  // Alias pour compatibilité (utilisé dans le store)
  async getPokemonDetails(nameOrId) {
    return this.getPokemonDetail(nameOrId);
  },

  // Get Pokémon species information (for flavor text, etc.)
  async getPokemonSpecies(id) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon species:', error);
      throw error;
    }
  },

  // Get a random Pokémon for capture game
  async getRandomPokemon() {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1; // First 1010 Pokémon
      const pokemon = await this.getPokemonDetail(randomId);
      return pokemon;
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
      throw error;
    }
  },

  // Get type information
  async getType(nameOrId) {
    try {
      const response = await fetch(`${BASE_URL}/type/${nameOrId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching type:', error);
      throw error;
    }
  }
};
