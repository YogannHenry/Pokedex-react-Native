# 🧰 Guide Zustand pour Débutants

## 🎯 Qu'est-ce que Zustand ?

**Zustand** est une bibliothèque **simple** et **légère** pour gérer l'état global dans React et React Native. Le mot "zustand" signifie "état" en allemand.

### ✅ Pourquoi Zustand ?

- **Simple** : Pas de boilerplate complexe
- **Léger** : Seulement 2KB
- **Flexible** : Fonctionne avec ou sans React
- **TypeScript** : Support natif
- **Persistance** : Sauvegarde automatique

### ❌ Comparaison avec Redux

| Redux | Zustand |
|-------|---------|
| Actions, Reducers, Dispatch | Actions directes |
| Beaucoup de code | Code minimal |
| Connect/useSelector | Hook direct |
| Complex setup | Setup en 3 lignes |

## 🚀 Installation

```bash
npm install zustand
npm install @react-native-async-storage/async-storage  # Pour la persistance
```

## 📝 Concepts de Base

### 1. **Store** = Magasin d'État Global

Le store contient :
- **État** : Les données (pokemonList, capturedPokemon...)
- **Actions** : Les fonctions pour modifier l'état

### 2. **Hook** = Moyen d'Accéder au Store

```javascript
const { pokemonList, addPokemon } = usePokemonStore();
```

## 🏗️ Structure du Store Pokédex

### État Stocké

```javascript
{
  pokemonList: [],        // Liste de tous les Pokémon
  capturedPokemon: [],    // Pokémon capturés
  favorites: [],          // IDs des favoris
  loading: false,         // État de chargement
  error: null            // Erreur éventuelle
}
```

### Actions Disponibles

```javascript
{
  // Charger des Pokémon
  loadPokemonList: (limit, offset) => {},
  
  // Gestion des captures
  addCapturedPokemon: (pokemon) => {},
  removeCapturedPokemon: (id) => {},
  isPokemonCaptured: (id) => {},
  
  // Gestion des favoris
  toggleFavorite: (id) => {},
  isFavorite: (id) => {},
  
  // Utilitaires
  initialize: () => {},
  clearError: () => {}
}
```

## 💡 Utilisation dans les Composants

### Import du Store

```javascript
import { usePokemonStore } from '../store/pokemonStore';
```

### Récupérer l'État

```javascript
const MyComponent = () => {
  // Récupérer seulement ce dont on a besoin
  const { pokemonList, loading } = usePokemonStore();
  
  return (
    <View>
      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <Text>{pokemonList.length} Pokémon</Text>
      )}
    </View>
  );
};
```

### Utiliser les Actions

```javascript
const DetailScreen = ({ pokemon }) => {
  // Récupérer les actions
  const { addCapturedPokemon, isPokemonCaptured } = usePokemonStore();
  
  const handleCapture = async () => {
    const success = await addCapturedPokemon(pokemon);
    if (success) {
      alert('Pokémon capturé !');
    }
  };
  
  const isAlreadyCaptured = isPokemonCaptured(pokemon.id);
  
  return (
    <TouchableOpacity onPress={handleCapture}>
      <Text>{isAlreadyCaptured ? 'Libérer' : 'Capturer'}</Text>
    </TouchableOpacity>
  );
};
```

## 🔄 Comment ça Marche ?

### 1. Création du Store

```javascript
export const usePokemonStore = create((set, get) => ({
  // État initial
  pokemonList: [],
  
  // Action pour modifier l'état
  addPokemon: (pokemon) => {
    const currentList = get().pokemonList;  // Récupérer l'état actuel
    set({ pokemonList: [...currentList, pokemon] });  // Modifier l'état
  }
}));
```

### 2. Utilisation dans le Composant

```javascript
const MyComponent = () => {
  const { pokemonList, addPokemon } = usePokemonStore();  // Hook magique !
  
  // Zustand re-rend automatiquement quand pokemonList change
  return <Text>{pokemonList.length} Pokémon</Text>;
};
```

### 3. Synchronisation Automatique

Quand `addPokemon` est appelé :
1. L'état du store change
2. **Tous** les composants qui utilisent `pokemonList` se re-rendent automatiquement
3. L'interface se met à jour partout !

## 💾 Persistance (Sauvegarde Automatique)

```javascript
export const usePokemonStore = create(
  persist(
    (set, get) => ({
      // Votre store normal
    }),
    {
      name: 'pokemon-storage',  // Nom de sauvegarde
      storage: createJSONStorage(() => AsyncStorage),  // Où sauvegarder
      partialize: (state) => ({
        // Quoi sauvegarder (pas tout !)
        capturedPokemon: state.capturedPokemon,
        favorites: state.favorites,
      }),
    }
  )
);
```

**Résultat** : Les Pokémon capturés et favoris sont automatiquement sauvegardés et restaurés au redémarrage !

## 🧪 Tester le Store

### Dans l'Écran de Test

```javascript
const TestScreen = () => {
  const { 
    pokemonList, 
    capturedPokemon, 
    loadPokemonList, 
    addCapturedPokemon 
  } = usePokemonStore();
  
  return (
    <View>
      <Text>Pokémon chargés : {pokemonList.length}</Text>
      <Text>Pokémon capturés : {capturedPokemon.length}</Text>
      
      <Button 
        title="Charger Pokémon" 
        onPress={() => loadPokemonList(10, 0)} 
      />
      
      <Button 
        title="Capturer Pikachu" 
        onPress={() => addCapturedPokemon(pikachu)} 
      />
    </View>
  );
};
```

## 🎨 Avantages dans cette App

### ✅ Synchronisation Automatique

- Capturer un Pokémon dans l'écran détail
- Badge "Capturé" apparaît automatiquement dans la liste
- Compteur mis à jour dans l'accueil
- **Aucun prop drilling** !

### ✅ Persistance Transparente

- Fermer l'app, la rouvrir
- Pokémon capturés toujours là
- Favoris conservés
- **Aucun code supplémentaire** !

### ✅ Code Simple

```javascript
// Au lieu de Redux...
const dispatch = useDispatch();
const pokemonList = useSelector(state => state.pokemon.list);
const loading = useSelector(state => state.pokemon.loading);
dispatch(fetchPokemonList());

// ...avec Zustand c'est simple !
const { pokemonList, loading, loadPokemonList } = usePokemonStore();
loadPokemonList();
```

## 🚨 Bonnes Pratiques

### ✅ À Faire

```javascript
// Destructurer seulement ce dont on a besoin
const { pokemonList, loading } = usePokemonStore();

// Actions courtes et claires
const handleCapture = () => addCapturedPokemon(pokemon);
```

### ❌ À Éviter

```javascript
// Récupérer tout le store (performance !)
const store = usePokemonStore();

// Mutations directes de l'état
store.pokemonList.push(newPokemon);  // ❌ Ne marche pas !
```

## 🔧 Fonctionnalités Avancées

### Selectors pour Optimiser

```javascript
// Au lieu de récupérer tout
const { pokemonList } = usePokemonStore();

// Récupérer seulement la longueur
const pokemonCount = usePokemonStore(state => state.pokemonList.length);
```

### Actions Conditionnelles

```javascript
const toggleCapture = usePokemonStore(state => state.isPokemonCaptured(pokemon.id) 
  ? () => state.removeCapturedPokemon(pokemon.id)
  : () => state.addCapturedPokemon(pokemon)
);
```

## 🎓 Exercices Pratiques

### 1. **Comprendre l'État**
- Ouvrir l'écran "Test Zustand"
- Observer les valeurs en temps réel
- Tester les boutons d'action

### 2. **Synchronisation**
- Capturer un Pokémon dans les détails
- Vérifier qu'il apparaît dans la collection
- Observer le compteur de l'accueil

### 3. **Persistance**
- Capturer plusieurs Pokémon
- Fermer et rouvrir l'app
- Vérifier que tout est conservé

### 4. **Favoris**
- Ajouter des Pokémon aux favoris
- Observer les badges dans la collection
- Tester la persistance

## 🚀 Aller Plus Loin

Une fois Zustand maîtrisé, vous pouvez :
- Ajouter d'autres stores (utilisateur, paramètres...)
- Implémenter des middleware personnalisés
- Utiliser avec TypeScript pour plus de sécurité
- Optimiser avec des selectors avancés

## 📚 Ressources

- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [Exemples React Native](https://github.com/pmndrs/zustand/tree/main/examples)
- [Comparaison avec Redux](https://blog.logrocket.com/using-zustand-react-state-management/)

---

💡 **Le secret de Zustand** : Il est si simple qu'on se demande pourquoi on a besoin d'autre chose ! 🎉
