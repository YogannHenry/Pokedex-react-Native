import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokeAPI } from '../services/PokeAPI';
import { StorageService } from '../services/StorageService';

export const usePokemonStore = create(
  persist(
    (set, get) => ({
      // État
      pokemonList: [],
      capturedPokemon: [],
      favorites: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedPokemon: null,

      // Actions pour la liste de Pokémon
      setPokemonList: (pokemonList) => set({ pokemonList }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      // Charger la liste de Pokémon
      loadPokemonList: async (limit = 20, offset = 0) => {
        set({ loading: true, error: null });
        try {
          const data = await PokeAPI.getPokemonList(limit, offset);
          
          // Charger les détails pour chaque Pokémon
          const detailedPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
              try {
                const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
                return await PokeAPI.getPokemonDetails(pokemonId);
              } catch (error) {
                console.error(`Error loading ${pokemon.name}:`, error);
                return null;
              }
            })
          );

          const validPokemon = detailedPokemon.filter(p => p !== null);
          const currentList = get().pokemonList;
          
          // Si c'est un nouveau chargement (offset = 0), remplacer la liste
          // Sinon, ajouter à la liste existante
          const newList = offset === 0 ? validPokemon : [...currentList, ...validPokemon];
          
          set({ 
            pokemonList: newList,
            loading: false 
          });
          
          return data;
        } catch (error) {
          set({ 
            error: error.message,
            loading: false 
          });
          throw error;
        }
      },

      // Charger les détails d'un Pokémon
      loadPokemonDetails: async (pokemonId) => {
        set({ loading: true, error: null });
        try {
          const pokemon = await PokeAPI.getPokemonDetails(pokemonId);
          set({ 
            selectedPokemon: pokemon,
            loading: false 
          });
          return pokemon;
        } catch (error) {
          set({ 
            error: error.message,
            loading: false 
          });
          throw error;
        }
      },

      // Actions pour les Pokémon capturés
      setCapturedPokemon: (capturedPokemon) => set({ capturedPokemon }),

      addCapturedPokemon: async (pokemon) => {
        try {
          const success = await StorageService.savePokemon(pokemon);
          if (success) {
            const currentCaptured = get().capturedPokemon;
            const isAlreadyCaptured = currentCaptured.some(p => p.id === pokemon.id);
            
            if (!isAlreadyCaptured) {
              set({ 
                capturedPokemon: [...currentCaptured, pokemon] 
              });
            }
            return true;
          }
          return false;
        } catch (error) {
          set({ error: error.message });
          return false;
        }
      },

      removeCapturedPokemon: async (pokemonId) => {
        try {
          const success = await StorageService.removePokemon(pokemonId);
          if (success) {
            const currentCaptured = get().capturedPokemon;
            set({ 
              capturedPokemon: currentCaptured.filter(p => p.id !== pokemonId) 
            });
            return true;
          }
          return false;
        } catch (error) {
          set({ error: error.message });
          return false;
        }
      },

      loadCapturedPokemon: async () => {
        try {
          const captured = await StorageService.getCapturedPokemon();
          set({ capturedPokemon: captured });
          return captured;
        } catch (error) {
          set({ error: error.message });
          return [];
        }
      },

      isPokemonCaptured: (pokemonId) => {
        const captured = get().capturedPokemon;
        return captured.some(p => p.id === pokemonId);
      },

      // Actions pour les favoris
      setFavorites: (favorites) => set({ favorites }),

      toggleFavorite: (pokemonId) => {
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.includes(pokemonId);
        
        if (isFavorite) {
          set({ 
            favorites: currentFavorites.filter(id => id !== pokemonId) 
          });
        } else {
          set({ 
            favorites: [...currentFavorites, pokemonId] 
          });
        }
      },

      isFavorite: (pokemonId) => {
        const favorites = get().favorites;
        return favorites.includes(pokemonId);
      },

      // Recherche
      searchPokemon: async (query) => {
        if (!query.trim()) {
          // Si la recherche est vide, recharger la liste complète
          return get().loadPokemonList();
        }

        set({ loading: true, error: null, searchQuery: query });
        try {
          // Rechercher dans la liste locale d'abord
          const currentList = get().pokemonList;
          const localResults = currentList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          );

          if (localResults.length > 0) {
            set({ 
              pokemonList: localResults,
              loading: false 
            });
            return { results: localResults };
          }

          // Si pas de résultats locaux, essayer de rechercher un Pokémon spécifique
          try {
            const pokemon = await PokeAPI.getPokemonDetails(query.toLowerCase());
            const pokemonListItem = {
              name: pokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
            };
            
            set({ 
              pokemonList: [pokemonListItem],
              loading: false 
            });
            return { results: [pokemonListItem] };
          } catch (searchError) {
            // Si aucun Pokémon trouvé
            set({ 
              pokemonList: [],
              loading: false 
            });
            return { results: [] };
          }
        } catch (error) {
          set({ 
            error: error.message,
            loading: false 
          });
          throw error;
        }
      },

      // Reset
      resetSearch: () => {
        set({ searchQuery: '' });
        get().loadPokemonList();
      },

      clearError: () => set({ error: null }),

      // Initialiser le store
      initialize: async () => {
        await Promise.all([
          get().loadPokemonList(),
          get().loadCapturedPokemon()
        ]);
      }
    }),
    {
      name: 'pokemon-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        capturedPokemon: state.capturedPokemon,
        favorites: state.favorites,
      }),
    }
  )
);
