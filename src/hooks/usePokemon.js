import { usePokemonStore } from '../store/pokemonStore';

// Hook pour les actions liées aux Pokémon capturés
export const useCapturedPokemon = () => {
  const { 
    capturedPokemon, 
    addCapturedPokemon, 
    removeCapturedPokemon, 
    isPokemonCaptured,
    loadCapturedPokemon 
  } = usePokemonStore();

  return {
    capturedPokemon,
    addCapturedPokemon,
    removeCapturedPokemon,
    isPokemonCaptured,
    loadCapturedPokemon,
    capturedCount: capturedPokemon.length
  };
};

// Hook pour les favoris
export const useFavorites = () => {
  const { 
    favorites, 
    toggleFavorite, 
    isFavorite 
  } = usePokemonStore();

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length
  };
};

// Hook pour la recherche et la liste de Pokémon
export const usePokemonList = () => {
  const { 
    pokemonList, 
    loading, 
    error, 
    searchQuery,
    loadPokemonList,
    searchPokemon,
    resetSearch,
    clearError 
  } = usePokemonStore();

  return {
    pokemonList,
    loading,
    error,
    searchQuery,
    loadPokemonList,
    searchPokemon,
    resetSearch,
    clearError,
    totalPokemon: pokemonList.length
  };
};

// Hook pour les détails d'un Pokémon
export const usePokemonDetails = () => {
  const { 
    selectedPokemon, 
    loading, 
    error,
    loadPokemonDetails,
    clearError 
  } = usePokemonStore();

  return {
    selectedPokemon,
    loading,
    error,
    loadPokemonDetails,
    clearError
  };
};
