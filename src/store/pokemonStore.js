// 📦 STORE ZUSTAND SIMPLIFIÉ POUR DÉBUTANTS
// Ce fichier contient toute la logique de gestion d'état de l'app Pokédex

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokeAPI } from '../services/PokeAPI';
import { StorageService } from '../services/StorageService';

// 🎯 CRÉATION DU STORE ZUSTAND
export const usePokemonStore = create(
  persist(
    (set, get) => ({
      // 📱 ÉTAT DE L'APPLICATION (ce qu'on stocke)
      pokemonList: [],           // Liste de tous les Pokémon
      capturedPokemon: [],       // Pokémon capturés par l'utilisateur
      favorites: [],             // IDs des Pokémon favoris
      loading: false,            // État de chargement
      error: null,               // Message d'erreur éventuel

      // 🔧 ACTIONS POUR LES POKÉMON (ce qu'on peut faire)
      
      // Charger la liste des Pokémon depuis l'API
      loadPokemonList: async (limit = 50, offset = 0) => {
        // 1. Indiquer qu'on charge
        set({ loading: true, error: null });
        
        try {
          // 2. Récupérer la liste basique depuis l'API
          const data = await PokeAPI.getPokemonList(limit, offset);
          
          // 3. Charger les détails de chaque Pokémon
          const detailedPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
              try {
                const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
                return await PokeAPI.getPokemonDetails(pokemonId);
              } catch (error) {
                console.error(`Erreur pour ${pokemon.name}:`, error);
                return null;
              }
            })
          );

          // 4. Filtrer les Pokémon valides
          const validPokemon = detailedPokemon.filter(p => p !== null);
          const currentList = get().pokemonList;
          
          // 5. Mettre à jour la liste (remplacer ou ajouter)
          const newList = offset === 0 ? validPokemon : [...currentList, ...validPokemon];
          
          // 6. Sauvegarder dans le store
          set({ 
            pokemonList: newList,
            loading: false 
          });
          
          return data;
        } catch (error) {
          // En cas d'erreur
          set({ 
            error: error.message,
            loading: false 
          });
          throw error;
        }
      },

      // 🎣 ACTIONS DE CAPTURE

      // Capturer un Pokémon (l'ajouter à la collection)
      addCapturedPokemon: async (pokemon) => {
        try {
          // 1. Sauvegarder dans le stockage local
          const success = await StorageService.savePokemon(pokemon);
          
          if (success) {
            // 2. Mettre à jour le store (éviter les doublons)
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

      // Libérer un Pokémon (le retirer de la collection)
      removeCapturedPokemon: async (pokemonId) => {
        try {
          // 1. Supprimer du stockage local
          const success = await StorageService.removePokemon(pokemonId);
          
          if (success) {
            // 2. Mettre à jour le store
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

      // Charger les Pokémon capturés depuis le stockage
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

      // Vérifier si un Pokémon est capturé
      isPokemonCaptured: (pokemonId) => {
        const captured = get().capturedPokemon;
        return captured.some(p => p.id === pokemonId);
      },

      // ❤️ ACTIONS POUR LES FAVORIS

      // Ajouter/retirer un Pokémon des favoris
      toggleFavorite: (pokemonId) => {
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.includes(pokemonId);
        
        if (isFavorite) {
          // Retirer des favoris
          set({ 
            favorites: currentFavorites.filter(id => id !== pokemonId) 
          });
        } else {
          // Ajouter aux favoris
          set({ 
            favorites: [...currentFavorites, pokemonId] 
          });
        }
      },

      // Vérifier si un Pokémon est favori
      isFavorite: (pokemonId) => {
        const favorites = get().favorites;
        return favorites.includes(pokemonId);
      },

      // 🛠️ ACTIONS UTILITAIRES

      // Effacer les erreurs
      clearError: () => set({ error: null }),

      // Initialiser l'application (première utilisation)
      initialize: async () => {
        try {
          // Charger les données de base en parallèle
          await Promise.all([
            get().loadPokemonList(20, 0),      // Charger 20 premiers Pokémon
            get().loadCapturedPokemon()        // Charger les Pokémon capturés
          ]);
        } catch (error) {
          console.error('Erreur initialisation:', error);
        }
      },

      // 🔍 RECHERCHE SIMPLE

      // Rechercher un Pokémon par nom
      searchPokemon: async (query) => {
        // Si pas de recherche, recharger la liste normale
        if (!query.trim()) {
          return get().loadPokemonList(20, 0);
        }

        set({ loading: true, error: null });
        try {
          // Recherche d'un Pokémon spécifique
          const pokemon = await PokeAPI.getPokemonDetails(query.toLowerCase());
          set({ 
            pokemonList: [pokemon],
            loading: false 
          });
          return { results: [pokemon] };
        } catch (error) {
          set({ 
            pokemonList: [],
            error: 'Pokémon non trouvé',
            loading: false 
          });
          return { results: [] };
        }
      },

      // Annuler la recherche et revenir à la liste normale
      resetSearch: () => {
        get().loadPokemonList(20, 0);
      }
    }),
    {
      // 💾 CONFIGURATION DE LA PERSISTANCE
      name: 'pokemon-storage',                    // Nom du stockage
      storage: createJSONStorage(() => AsyncStorage),  // Utiliser AsyncStorage
      partialize: (state) => ({
        // Seuls ces éléments sont sauvegardés automatiquement
        capturedPokemon: state.capturedPokemon,
        favorites: state.favorites,
      }),
    }
  )
);
