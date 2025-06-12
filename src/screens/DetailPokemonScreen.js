import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const DetailPokemonScreen = ({ route }) => {
  const { pokemon } = route.params;
  const [loading, setLoading] = useState(false);
  
  const { 
    isPokemonCaptured, 
    addCapturedPokemon, 
    removeCapturedPokemon,
    isFavorite,
    toggleFavorite 
  } = usePokemonStore();

  const estCapture = isPokemonCaptured(pokemon.id);
  const estFavori = isFavorite(pokemon.id);

  const gererCapture = async () => {
    setLoading(true);
    try {
      if (estCapture) {
        const success = await removeCapturedPokemon(pokemon.id);
        if (success) {
          Alert.alert('Libéré', `${pokemon.name} a été libéré de votre collection`);
        }
      } else {
        const success = await addCapturedPokemon(pokemon);
        if (success) {
          Alert.alert('Capturé !', `${pokemon.name} a été ajouté à votre collection !`);
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const gererFavori = () => {
    toggleFavorite(pokemon.id);
    Alert.alert(
      estFavori ? 'Retiré des favoris' : 'Ajouté aux favoris',
      `${pokemon.name} ${estFavori ? 'retiré de' : 'ajouté à'} vos favoris`
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image et nom */}
      <View style={styles.header}>
        <Image 
          source={{ uri: pokemon.sprites?.front_default }} 
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId}>#{pokemon.id}</Text>
      </View>

      {/* Informations de base */}
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>Informations de base</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Taille :</Text>
          <Text style={styles.value}>{pokemon.height / 10} m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Poids :</Text>
          <Text style={styles.value}>{pokemon.weight / 10} kg</Text>
        </View>
      </View> */}

      {/* Types */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Types</Text>
        <View style={styles.typesContainer}>
          {pokemon.types?.map((typeInfo, index) => (
            <View key={index} style={styles.typeChip}>
              <Text style={styles.typeText}>
                {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistiques</Text>
        {pokemon.stats?.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statName}>
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} :
            </Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>

      {/* Boutons d'action */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.button, estCapture ? styles.buttonRelease : styles.buttonCapture]}
          onPress={gererCapture}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading 
              ? (estCapture ? 'Libération...' : 'Capture...') 
              : (estCapture ? 'Libérer' : 'Capturer')
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, estFavori ? styles.buttonFavoriteActive : styles.buttonFavorite]}
          onPress={gererFavori}
        >
          <Text style={styles.buttonText}>
            {estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  
  pokemonId: {
    fontSize: 18,
    color: '#666',
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
    marginBottom: 10,
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  label: {
    fontSize: 16,
    color: '#666',
  },
  
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  typeChip: {
    backgroundColor: '#4285f4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  statName: {
    fontSize: 16,
    color: '#666',
  },
  
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  
  actionsContainer: {
    padding: 15,
    gap: 10,
    paddingBottom: 30,
  },
  
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  buttonCapture: {
    backgroundColor: '#4caf50',
  },
  
  buttonRelease: {
    backgroundColor: '#f44336',
  },
  
  buttonFavorite: {
    backgroundColor: '#ff9800',
  },
  
  buttonFavoriteActive: {
    backgroundColor: '#e91e63',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailPokemonScreen;
