import { colors } from '../styles/globalStyles';

// Capitalize first letter of a string
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Get color for Pokémon type
export const getTypeColor = (type) => {
  return colors.types[type] || colors.gray;
};

// Format Pokémon ID with leading zeros
export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`;
};

// Convert height from decimeters to meters
export const formatHeight = (height) => {
  return `${(height / 10).toFixed(1)} m`;
};

// Convert weight from hectograms to kilograms
export const formatWeight = (weight) => {
  return `${(weight / 10).toFixed(1)} kg`;
};

// Get stat name in a more readable format
export const formatStatName = (statName) => {
  const statMap = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed',
  };
  return statMap[statName] || capitalize(statName);
};

// Calculate capture probability based on Pokémon stats
export const calculateCaptureRate = (pokemon) => {
  const baseStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const maxStats = 600; // Approximate max base stat total
  const difficulty = baseStats / maxStats;
  
  // Base capture rate of 70%, reduced by difficulty
  const captureRate = Math.max(0.3, 0.7 - (difficulty * 0.4));
  return Math.round(captureRate * 100);
};

// Generate random catch phrase
export const getRandomCatchPhrase = () => {
  const phrases = [
    "A wild Pokémon appeared!",
    "You encountered a Pokémon!",
    "A Pokémon is nearby!",
    "Look! A Pokémon!",
    "Pokémon spotted!",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

// Generate random success/failure messages
export const getCaptureResultMessage = (success, pokemonName) => {
  if (success) {
    const successMessages = [
      `Gotcha! ${capitalize(pokemonName)} was caught!`,
      `${capitalize(pokemonName)} was successfully captured!`,
      `Great! You caught ${capitalize(pokemonName)}!`,
      `${capitalize(pokemonName)} is now part of your team!`,
    ];
    return successMessages[Math.floor(Math.random() * successMessages.length)];
  } else {
    const failMessages = [
      `Oh no! ${capitalize(pokemonName)} broke free!`,
      `${capitalize(pokemonName)} escaped!`,
      `So close! ${capitalize(pokemonName)} got away!`,
      `${capitalize(pokemonName)} broke out of the Pokéball!`,
    ];
    return failMessages[Math.floor(Math.random() * failMessages.length)];
  }
};
