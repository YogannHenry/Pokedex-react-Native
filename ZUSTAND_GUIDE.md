# Guide Zustand - Gestion d'État Pokédex

## Vue d'ensemble

Zustand est une solution de gestion d'état légère et simple pour React. Dans ce projet Pokédex, nous l'utilisons pour gérer l'état global de l'application de manière plus efficace que les solutions traditionnelles comme Redux.

## Structure du Store

### Fichier principal : `src/store/pokemonStore.js`

Le store principal contient :

- **État** : pokemonList, capturedPokemon, favorites, loading, error, etc.
- **Actions** : loadPokemonList, addCapturedPokemon, toggleFavorite, etc.
- **Persistance** : Sauvegarde automatique avec AsyncStorage

### Hooks personnalisés : `src/hooks/usePokemon.js`

Les hooks simplifient l'utilisation du store :

- `useCapturedPokemon()` - Gestion des Pokémon capturés
- `useFavorites()` - Gestion des favoris
- `usePokemonList()` - Gestion de la liste et recherche
- `usePokemonDetails()` - Détails d'un Pokémon spécifique

## Fonctionnalités principales

### 1. Gestion des Pokémon capturés

```javascript
const { capturedPokemon, addCapturedPokemon, removeCapturedPokemon } = useCapturedPokemon();

// Ajouter un Pokémon
await addCapturedPokemon(pokemon);

// Supprimer un Pokémon
await removeCapturedPokemon(pokemonId);

// Vérifier si capturé
const isCaptured = isPokemonCaptured(pokemonId);
```

### 2. Système de favoris

```javascript
const { favorites, toggleFavorite, isFavorite } = useFavorites();

// Basculer un favori
toggleFavorite(25); // Pikachu

// Vérifier si en favori
const favorite = isFavorite(25);
```

### 3. Chargement et recherche

```javascript
const { pokemonList, loadPokemonList, searchPokemon } = usePokemonList();

// Charger la liste
await loadPokemonList(20, 0); // limit, offset

// Rechercher
await searchPokemon('pikachu');
```

### 4. Persistance des données

Les données importantes (Pokémon capturés, favoris) sont automatiquement sauvegardées dans AsyncStorage et restaurées au démarrage de l'app.

## Avantages de Zustand

### 1. **Simplicité**
- Pas de boilerplate complexe
- API intuitive et minimaliste
- Facilement compréhensible

### 2. **Performance**
- Re-renders optimisés
- Sélecteurs automatiques
- Pas de providers nécessaires

### 3. **TypeScript friendly**
- Support TypeScript natif
- Inférence de types automatique

### 4. **Flexibilité**
- Peut être utilisé avec ou sans React
- Support middleware (persistance, devtools)
- Facilement extensible

## Comparaison avec d'autres solutions

### vs Redux
- ✅ Moins de boilerplate
- ✅ Plus simple à comprendre
- ✅ Bundle plus léger
- ✅ Pas besoin de providers

### vs Context API
- ✅ Meilleures performances
- ✅ Pas de re-renders inutiles
- ✅ Utilisation plus simple
- ✅ Gestion d'état plus robuste

### vs useState
- ✅ État global partagé
- ✅ Persistance automatique
- ✅ Actions centralisées
- ✅ Logique métier organisée

## Tests et développement

### Écran de test : `StoreTestScreen`

Un écran dédié permet de tester toutes les fonctionnalités du store :

- Visualisation de l'état en temps réel
- Boutons pour tester chaque action
- Gestion des erreurs
- Navigation entre écrans

### Comment tester

1. Lancer l'app
2. Aller à l'écran d'accueil
3. Cliquer sur "Test Zustand"
4. Tester les différentes fonctionnalités

## Structure des fichiers modifiés

```
src/
├── store/
│   └── pokemonStore.js          # Store principal Zustand
├── hooks/
│   └── usePokemon.js           # Hooks personnalisés
├── screens/
│   ├── PokemonDetailScreen.js  # Modifié pour utiliser Zustand
│   ├── HomeScreen.js           # Modifié pour utiliser Zustand
│   ├── PokemonListScreen.js    # Modifié pour utiliser Zustand
│   └── StoreTestScreen.js      # Nouveau - Test du store
└── navigation/
    └── AppNavigator.js         # Ajout route test
```

## Prochaines étapes

### Fonctionnalités possibles à ajouter

1. **Système de filtres avancés**
   - Par type, génération, région
   - Tri par statistiques

2. **Mode hors ligne**
   - Cache des données
   - Synchronisation

3. **Favoris améliorés**
   - Catégories de favoris
   - Notes personnelles

4. **Statistiques avancées**
   - Graphiques de collection
   - Analyses de types

### Optimisations

1. **Sélecteurs optimisés**
   - Éviter les re-renders inutiles
   - Mémorisation des calculs

2. **Lazy loading**
   - Chargement progressif
   - Pagination optimisée

3. **Cache intelligent**
   - TTL pour les données
   - Invalidation sélective

## Ressources

- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [Exemples et patterns](https://github.com/pmndrs/zustand/tree/main/examples)
- [Middleware disponibles](https://github.com/pmndrs/zustand#middleware)
