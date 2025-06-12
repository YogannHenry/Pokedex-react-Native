# 📋 Exemples Pratiques Zustand

## 🎯 Exemples Concrets d'Utilisation du Store

Ce fichier contient des exemples pratiques montrant comment utiliser le store Zustand dans différents cas d'usage.

## 1. 📱 Affichage Simple de l'État

### Composant qui Affiche des Statistiques

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const StatsComponent = () => {
  // ✅ Récupérer seulement ce dont on a besoin
  const { pokemonList, capturedPokemon, favorites } = usePokemonStore();
  
  return (
    <View>
      <Text>Pokémon disponibles : {pokemonList.length}</Text>
      <Text>Pokémon capturés : {capturedPokemon.length}</Text>
      <Text>Favoris : {favorites.length}</Text>
    </View>
  );
};
```

### Composant qui Affiche le Statut de Chargement

```javascript
const LoadingComponent = () => {
  // Ne récupérer que loading et error
  const { loading, error } = usePokemonStore();
  
  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur : {error}</Text>;
  return <Text>Prêt !</Text>;
};
```

## 2. 🎬 Actions Simples

### Bouton pour Charger des Pokémon

```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { usePokemonStore } from '../store/pokemonStore';

const LoadPokemonButton = () => {
  // Récupérer l'action
  const { loadPokemonList } = usePokemonStore();
  
  const handlePress = async () => {
    try {
      await loadPokemonList(20, 0);  // Charger 20 Pokémon
      alert('Pokémon chargés !');
    } catch (error) {
      alert('Erreur de chargement');
    }
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Charger 20 Pokémon</Text>
    </TouchableOpacity>
  );
};
```

### Bouton de Capture Intelligent

```javascript
const CaptureButton = ({ pokemon }) => {
  // Récupérer l'action et la fonction de vérification
  const { 
    addCapturedPokemon, 
    removeCapturedPokemon, 
    isPokemonCaptured 
  } = usePokemonStore();
  
  // Vérifier l'état actuel
  const isAlreadyCaptured = isPokemonCaptured(pokemon.id);
  
  const handleCapture = async () => {
    if (isAlreadyCaptured) {
      await removeCapturedPokemon(pokemon.id);
      alert(`${pokemon.name} libéré !`);
    } else {
      await addCapturedPokemon(pokemon);
      alert(`${pokemon.name} capturé !`);
    }
  };
  
  return (
    <TouchableOpacity onPress={handleCapture}>
      <Text>{isAlreadyCaptured ? 'Libérer' : 'Capturer'}</Text>
    </TouchableOpacity>
  );
};
```

## 3. ❤️ Gestion des Favoris

### Bouton Toggle Favori

```javascript
const FavoriteButton = ({ pokemonId }) => {
  const { toggleFavorite, isFavorite } = usePokemonStore();
  
  const isFav = isFavorite(pokemonId);
  
  return (
    <TouchableOpacity onPress={() => toggleFavorite(pokemonId)}>
      <Text>{isFav ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );
};
```

### Liste des Favoris

```javascript
const FavoritesList = () => {
  const { pokemonList, favorites } = usePokemonStore();
  
  // Filtrer les Pokémon favoris
  const favoritePokemon = pokemonList.filter(pokemon => 
    favorites.includes(pokemon.id)
  );
  
  return (
    <View>
      <Text>Mes Favoris ({favoritePokemon.length})</Text>
      {favoritePokemon.map(pokemon => (
        <Text key={pokemon.id}>{pokemon.name}</Text>
      ))}
    </View>
  );
};
```

## 4. 🔍 Recherche Dynamique

### Barre de Recherche

```javascript
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchPokemon, resetSearch } = usePokemonStore();
  
  const handleSearch = async () => {
    if (query.trim()) {
      await searchPokemon(query);
    }
  };
  
  const handleReset = () => {
    setQuery('');
    resetSearch();
  };
  
  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Nom du Pokémon..."
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text>Rechercher</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 5. 📊 Composant de Statistiques Avancées

### Analyseur de Collection

```javascript
const CollectionAnalytics = () => {
  const { pokemonList, capturedPokemon, favorites } = usePokemonStore();
  
  // Calculs dérivés
  const completionRate = pokemonList.length > 0 
    ? Math.round((capturedPokemon.length / pokemonList.length) * 100)
    : 0;
  
  const favoriteRate = capturedPokemon.length > 0
    ? Math.round((favorites.length / capturedPokemon.length) * 100)
    : 0;
  
  // Types les plus capturés
  const typeStats = capturedPokemon.reduce((acc, pokemon) => {
    pokemon.types?.forEach(typeInfo => {
      const typeName = typeInfo.type.name;
      acc[typeName] = (acc[typeName] || 0) + 1;
    });
    return acc;
  }, {});
  
  const mostCapturedType = Object.keys(typeStats).reduce((a, b) => 
    typeStats[a] > typeStats[b] ? a : b, ''
  );
  
  return (
    <View>
      <Text>📊 Analyse de Collection</Text>
      <Text>Taux de complétion : {completionRate}%</Text>
      <Text>Taux de favoris : {favoriteRate}%</Text>
      <Text>Type préféré : {mostCapturedType}</Text>
    </View>
  );
};
```

## 6. 🎮 Composant de Test Interactif

### Testeur d'Actions

```javascript
const ActionTester = () => {
  const { 
    pokemonList,
    capturedPokemon,
    favorites,
    loading,
    error,
    initialize,
    loadPokemonList,
    clearError
  } = usePokemonStore();
  
  return (
    <View>
      <Text>🧪 Testeur d'Actions Zustand</Text>
      
      {/* État actuel */}
      <Text>État :</Text>
      <Text>- Pokémon : {pokemonList.length}</Text>
      <Text>- Capturés : {capturedPokemon.length}</Text>
      <Text>- Favoris : {favorites.length}</Text>
      <Text>- Chargement : {loading ? 'Oui' : 'Non'}</Text>
      {error && <Text>- Erreur : {error}</Text>}
      
      {/* Actions */}
      <TouchableOpacity onPress={initialize}>
        <Text>🔄 Initialiser</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => loadPokemonList(10, 0)}>
        <Text>📥 Charger 10 Pokémon</Text>
      </TouchableOpacity>
      
      {error && (
        <TouchableOpacity onPress={clearError}>
          <Text>❌ Effacer l'erreur</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
```

## 7. 🔗 Utilisation avec Navigation

### Écran qui Navigue avec Données

```javascript
const PokemonListScreen = ({ navigation }) => {
  const { pokemonList, loadPokemonList } = usePokemonStore();
  
  useEffect(() => {
    // Charger au montage du composant
    loadPokemonList(50, 0);
  }, []);
  
  const navigateToDetail = (pokemon) => {
    navigation.navigate('DetailPokemon', { pokemon });
  };
  
  return (
    <FlatList
      data={pokemonList}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigateToDetail(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
```

## 8. 🎯 Selectors Optimisés

### Utilisation de Selectors pour Performance

```javascript
// Au lieu de récupérer tout l'objet
const BadExample = () => {
  const store = usePokemonStore();  // ❌ Re-render à chaque changement
  return <Text>{store.pokemonList.length}</Text>;
};

// Mieux : récupérer seulement ce qui nous intéresse
const GoodExample = () => {
  const pokemonCount = usePokemonStore(state => state.pokemonList.length);  // ✅
  return <Text>{pokemonCount}</Text>;
};

// Encore mieux : selector customisé
const AdvancedExample = () => {
  const stats = usePokemonStore(state => ({
    total: state.pokemonList.length,
    captured: state.capturedPokemon.length,
    completion: state.pokemonList.length > 0 
      ? Math.round((state.capturedPokemon.length / state.pokemonList.length) * 100)
      : 0
  }));
  
  return (
    <View>
      <Text>Total : {stats.total}</Text>
      <Text>Capturés : {stats.captured}</Text>
      <Text>Complétion : {stats.completion}%</Text>
    </View>
  );
};
```

## 9. 🚨 Gestion d'Erreurs

### Composant qui Gère les Erreurs

```javascript
const ErrorHandler = ({ children }) => {
  const { error, clearError } = usePokemonStore();
  
  if (error) {
    return (
      <View>
        <Text>Une erreur est survenue :</Text>
        <Text>{error}</Text>
        <TouchableOpacity onPress={clearError}>
          <Text>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return children;
};

// Utilisation
const MyApp = () => (
  <ErrorHandler>
    <PokemonListScreen />
  </ErrorHandler>
);
```

## 10. 🔄 Patterns Avancés

### Hook Personnalisé

```javascript
// Créer un hook personnalisé pour la logique complexe
const usePokemonCapture = (pokemon) => {
  const { 
    addCapturedPokemon, 
    removeCapturedPokemon, 
    isPokemonCaptured 
  } = usePokemonStore();
  
  const isCaptured = isPokemonCaptured(pokemon.id);
  
  const toggle = async () => {
    if (isCaptured) {
      return await removeCapturedPokemon(pokemon.id);
    } else {
      return await addCapturedPokemon(pokemon);
    }
  };
  
  return { isCaptured, toggle };
};

// Utilisation simplifiée
const PokemonCard = ({ pokemon }) => {
  const { isCaptured, toggle } = usePokemonCapture(pokemon);
  
  return (
    <TouchableOpacity onPress={toggle}>
      <Text>{pokemon.name}</Text>
      <Text>{isCaptured ? 'Capturé' : 'Libre'}</Text>
    </TouchableOpacity>
  );
};
```

## 🎓 Points Clés à Retenir

1. **Destructuration** : Ne récupérez que ce dont vous avez besoin
2. **Actions** : Utilisez directement les fonctions du store
3. **État Dérivé** : Calculez les données à partir de l'état de base
4. **Performance** : Utilisez des selectors pour éviter les re-renders inutiles
5. **Simplicité** : Zustand encourage le code simple et direct

## 🚀 Testez Vous-Même !

1. Copiez ces exemples dans votre projet
2. Modifiez-les selon vos besoins
3. Observez comment l'état se synchronise automatiquement
4. Expérimentez avec de nouvelles actions !

---

💡 **Astuce** : La magie de Zustand, c'est sa simplicité. Pas besoin de concepts complexes, juste des fonctions et de l'état ! ✨
