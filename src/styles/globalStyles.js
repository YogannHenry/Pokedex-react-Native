import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#e74c3c',
  secondary: '#3498db',
  success: '#2ecc71',
  warning: '#f39c12',
  danger: '#e74c3c',
  light: '#ecf0f1',
  dark: '#2c3e50',
  gray: '#95a5a6',
  white: '#ffffff',
  black: '#000000',
  
  // Pokémon type colors
  types: {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 4,
  },
  
  text: {
    fontSize: 16,
    color: colors.dark,
    lineHeight: 24,
  },
  
  smallText: {
    fontSize: 14,
    color: colors.gray,
  },
  
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  
  outlineButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  pokemonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  
  smallPokemonImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  
  typeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginVertical: 16,
  },
});
