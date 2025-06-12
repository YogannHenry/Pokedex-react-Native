import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { capitalize, formatPokemonId, getTypeColor } from '../utils/helpers';

const PokemonCard = ({ pokemon, onPress, showCapturedBadge = false, isCaptured = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        {showCapturedBadge && isCaptured && (
          <View style={styles.capturedBadge}>
            <Text style={styles.capturedText}>Captured</Text>
          </View>
        )}
      </View>
      
      <Image 
        source={{ uri: pokemon.sprites?.front_default || pokemon.sprites?.other?.['official-artwork']?.front_default }}
        style={styles.image}
      />
      
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      
      <View style={styles.types}>
        {pokemon.types?.map((typeInfo, index) => (
          <View 
            key={index} 
            style={[styles.typeChip, { backgroundColor: getTypeColor(typeInfo.type.name) }]}
          >
            <Text style={styles.typeText}>{capitalize(typeInfo.type.name)}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    alignItems: 'center',
    margin: 8,
    width: 160,
  },
  
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  id: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray,
  },
  
  capturedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  capturedText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  
  typeChip: {
    ...globalStyles.typeChip,
    marginHorizontal: 2,
  },
  
  typeText: {
    ...globalStyles.typeText,
    fontSize: 10,
  },
});

export default PokemonCard;
