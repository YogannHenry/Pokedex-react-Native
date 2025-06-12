import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const AccueilScreen = ({ navigation }) => {
  const { 
    pokemonList, 
    capturedPokemon, 
    favorites, 
    loading, 
    initialize 
  } = usePokemonStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await initialize();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les données');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Titre */}
      <View style={styles.header}>
        <Text style={styles.title}>Mon Pokédex</Text>
        <Text style={styles.subtitle}>Bienvenue dans votre collection</Text>
      </View>

      {/* Statistiques */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Mes Statistiques</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pokemonList.length}</Text>
            <Text style={styles.statLabel}>Pokémon disponibles</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{capturedPokemon.length}</Text>
            <Text style={styles.statLabel}>Capturés</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {capturedPokemon.length > 0 ? Math.round((capturedPokemon.length / pokemonList.length) * 100) : 0}%
            </Text>
            <Text style={styles.statLabel}>Complété</Text>
          </View>
        </View>
      </View>

      {/* Boutons de navigation */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('ListePokemon')}
        >
          <Text style={styles.buttonText}>Voir tous les Pokémon</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.buttonText}>Ma Collection</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonTest]}
          onPress={() => navigation.navigate('StoreTest')}
        >
          <Text style={styles.buttonText}>Test Zustand</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#666',
  },
  
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
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
    marginBottom: 15,
    textAlign: 'center',
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  
  buttonsContainer: {
    gap: 15,
  },
  
  button: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: '#34a853',
  },
  
  buttonTest: {
    backgroundColor: '#ff9800',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccueilScreen;
