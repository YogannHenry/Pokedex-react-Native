import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const StoreTestScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🎯 UTILISATION DU STORE ZUSTAND
  // Récupération de l'état et des actions
  const { 
    pokemonList, 
    capturedPokemon, 
    favorites, 
    loading, 
    error,
    initialize,
    loadPokemonList,
    searchPokemon,
    resetSearch,
    toggleFavorite,
    clearError,
    addCapturedPokemon,
    isPokemonCaptured,
    isFavorite
  } = usePokemonStore();

  // 🧪 FONCTIONS DE TEST

  const handleInitialiser = async () => {
    try {
      await initialize();
      Alert.alert('✅ Succès', 'Store initialisé avec succès !');
    } catch (error) {
      Alert.alert('❌ Erreur', `Échec de l'initialisation: ${error.message}`);
    }
  };

  const handleChargerPokemon = async () => {
    try {
      await loadPokemonList(10, 0);
      Alert.alert('✅ Succès', `${pokemonList.length} Pokémon chargés !`);
    } catch (error) {
      Alert.alert('❌ Erreur', `Échec du chargement: ${error.message}`);
    }
  };

  const handleRechercher = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('⚠️ Attention', 'Veuillez entrer un nom de Pokémon');
      return;
    }
    
    try {
      await searchPokemon(searchQuery.toLowerCase());
      Alert.alert('✅ Recherche', `Recherche terminée pour "${searchQuery}"`);
    } catch (error) {
      Alert.alert('❌ Erreur', `Pokémon "${searchQuery}" non trouvé`);
    }
  };

  const handleFavoriPikachu = () => {
    toggleFavorite(25); // ID de Pikachu
    const isPikachuFavorite = isFavorite(25);
    Alert.alert(
      '❤️ Favoris', 
      `Pikachu ${isPikachuFavorite ? 'ajouté aux' : 'retiré des'} favoris !`
    );
  };

  const handleCapturerPikachu = async () => {
    const pikachu = pokemonList.find(p => p.id === 25);
    if (!pikachu) {
      Alert.alert('⚠️ Attention', 'Chargez d\'abord des Pokémon pour tester');
      return;
    }

    const isAlreadyCaptured = isPokemonCaptured(25);
    if (isAlreadyCaptured) {
      Alert.alert('ℹ️ Info', 'Pikachu est déjà capturé !');
      return;
    }

    try {
      await addCapturedPokemon(pikachu);
      Alert.alert('🎉 Succès', 'Pikachu capturé avec succès !');
    } catch (error) {
      Alert.alert('❌ Erreur', 'Échec de la capture');
    }
  };

  // Calculs dérivés (exemples de logique métier)
  const premierPokemon = pokemonList.length > 0 ? pokemonList[0] : null;
  const completionRate = pokemonList.length > 0 
    ? Math.round((capturedPokemon.length / pokemonList.length) * 100)
    : 0;

  return (
    <ScrollView style={styles.container}>
      {/* En-tête explicatif */}
      <View style={styles.header}>
        <Text style={styles.title}>🧪 Test du Store Zustand</Text>
        <Text style={styles.subtitle}>
          Écran d'apprentissage interactif pour comprendre Zustand
        </Text>
        <Text style={styles.explanation}>
          Testez les actions et observez l'état en temps réel !
        </Text>
      </View>

      {/* 📊 ÉTAT DU STORE EN TEMPS RÉEL */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 État du Store (Temps Réel)</Text>
        <Text style={styles.cardSubtitle}>
          Ces valeurs changent automatiquement grâce à Zustand !
        </Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>🗂️ Pokémon chargés:</Text>
          <Text style={styles.statValue}>{pokemonList.length}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>🎯 Pokémon capturés:</Text>
          <Text style={styles.statValue}>{capturedPokemon.length}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>❤️ Favoris:</Text>
          <Text style={styles.statValue}>{favorites.length}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>⏳ Chargement:</Text>
          <Text style={styles.statValue}>{loading ? 'En cours...' : 'Terminé'}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>📈 Taux complétion:</Text>
          <Text style={styles.statValue}>{completionRate}%</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ Erreur: {error}</Text>
            <TouchableOpacity onPress={clearError} style={styles.clearErrorButton}>
              <Text style={styles.clearErrorText}>Effacer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 🎮 ACTIONS DE BASE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎮 Actions de Base</Text>
        <Text style={styles.cardSubtitle}>
          Ces boutons modifient l'état du store
        </Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleInitialiser}>
          <Text style={styles.actionButtonText}>🔄 Initialiser le Store</Text>
          <Text style={styles.actionDescription}>Charge les données initiales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleChargerPokemon}>
          <Text style={styles.actionButtonText}>📥 Charger 10 Pokémon</Text>
          <Text style={styles.actionDescription}>Met à jour pokemonList[]</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCapturerPikachu}>
          <Text style={styles.actionButtonText}>🎯 Capturer Pikachu</Text>
          <Text style={styles.actionDescription}>Ajoute à capturedPokemon[]</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleFavoriPikachu}>
          <Text style={styles.actionButtonText}>❤️ Toggle Favori Pikachu</Text>
          <Text style={styles.actionDescription}>Modifie favorites[]</Text>
        </TouchableOpacity>
      </View>

      {/* 🔍 RECHERCHE INTERACTIVE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔍 Test de Recherche</Text>
        <Text style={styles.cardSubtitle}>
          Testez les actions asynchrones
        </Text>
        
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Nom du Pokémon (ex: pikachu, charizard...)"
          placeholderTextColor="#999"
        />
        
        <View style={styles.searchButtonsRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.searchButton]} 
            onPress={handleRechercher}
          >
            <Text style={styles.actionButtonText}>🔍 Rechercher</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.resetButton]} 
            onPress={() => {
              setSearchQuery('');
              resetSearch();
            }}
          >
            <Text style={styles.actionButtonText}>↺ Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📦 PREMIER POKÉMON CHARGÉ */}
      {premierPokemon && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Premier Pokémon Chargé</Text>
          <Text style={styles.cardSubtitle}>
            Exemple d'utilisation des données du store
          </Text>
          
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonName}>
              {premierPokemon.name.charAt(0).toUpperCase() + premierPokemon.name.slice(1)}
            </Text>
            <Text style={styles.pokemonId}>ID: {premierPokemon.id}</Text>
            
            <View style={styles.pokemonStatus}>
              <Text style={styles.statusText}>
                État: {isPokemonCaptured(premierPokemon.id) ? '✅ Capturé' : '⭕ Libre'}
              </Text>
              <Text style={styles.statusText}>
                Favori: {isFavorite(premierPokemon.id) ? '❤️ Oui' : '🤍 Non'}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.detailButton}
              onPress={() => navigation.navigate('DetailPokemon', { pokemon: premierPokemon })}
            >
              <Text style={styles.detailButtonText}>👀 Voir Détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 🧩 EXPLICATION ZUSTAND */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧩 Comment ça Marche ?</Text>
        
        <View style={styles.explanationStep}>
          <Text style={styles.stepNumber}>1.</Text>
          <Text style={styles.stepText}>
            <Text style={styles.bold}>Récupération :</Text> {'\n'}
            const {'{ pokemonList, addCapturedPokemon }'} = usePokemonStore();
          </Text>
        </View>
        
        <View style={styles.explanationStep}>
          <Text style={styles.stepNumber}>2.</Text>
          <Text style={styles.stepText}>
            <Text style={styles.bold}>Action :</Text> {'\n'}
            addCapturedPokemon(pokemon) modifie le store
          </Text>
        </View>
        
        <View style={styles.explanationStep}>
          <Text style={styles.stepNumber}>3.</Text>
          <Text style={styles.stepText}>
            <Text style={styles.bold}>Re-render automatique :</Text> {'\n'}
            Tous les composants utilisant capturedPokemon se mettent à jour !
          </Text>
        </View>
      </View>

      {/* 🚀 NAVIGATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀 Explorer l'Application</Text>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('ListePokemon')}
        >
          <Text style={styles.navButtonText}>🗂️ Liste des Pokémon</Text>
          <Text style={styles.navDescription}>Voir les données chargées</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.navButtonText}>📚 Ma Collection</Text>
          <Text style={styles.navDescription}>Voir les Pokémon capturés</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  
  explanation: {
    fontSize: 14,
    color: '#4285f4',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    paddingVertical: 4,
  },
  
  statLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
    minWidth: 60,
    textAlign: 'right',
  },
  
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  errorText: {
    color: '#f44336',
    flex: 1,
    fontSize: 14,
  },
  
  clearErrorButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  clearErrorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  actionButton: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  actionDescription: {
    color: '#e3f2fd',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  
  searchButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  
  searchButton: {
    flex: 1,
    backgroundColor: '#4caf50',
  },
  
  resetButton: {
    flex: 1,
    backgroundColor: '#ff9800',
  },
  
  pokemonInfo: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  pokemonId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  
  pokemonStatus: {
    alignItems: 'center',
    marginBottom: 15,
  },
  
  statusText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  
  detailButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  
  explanationStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285f4',
    marginRight: 12,
    minWidth: 25,
  },
  
  stepText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  
  bold: {
    fontWeight: 'bold',
    color: '#4285f4',
  },
  
  navButton: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  
  navButtonText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  navDescription: {
    color: '#1976d2',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default StoreTestScreen;
