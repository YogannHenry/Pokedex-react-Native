# Pokédex Simple avec Zustand

## 📱 Application Pokédex pour Débutants

Cette application Pokédex a été créée pour apprendre Zustand, une bibliothèque de gestion d'état simple pour React Native.

## 🏗️ Structure de l'Application

L'application contient **4 écrans principaux** :

### 1. 🏠 **Écran d'Accueil** (`AccueilScreen.js`)
- Affiche les statistiques de votre collection
- Boutons pour naviguer vers les autres écrans
- Montre le nombre de Pokémon capturés et favoris

### 2. 📋 **Liste des Pokémon** (`ListePokemonScreen.js`)
- Affiche tous les Pokémon disponibles
- Grille de cartes avec images
- Badge "Capturé" pour les Pokémon dans votre collection

### 3. 🔍 **Détails d'un Pokémon** (`DetailPokemonScreen.js`)
- Informations détaillées (taille, poids, types, statistiques)
- Bouton "Capturer" ou "Libérer"
- Bouton "Ajouter aux favoris"

### 4. 📚 **Ma Collection** (`SimpleCollectionScreen.js`)
- Affiche uniquement vos Pokémon capturés
- Badge "Favori" pour les Pokémon favoris
- Message si la collection est vide

## 🧰 Zustand Store (`pokemonStore.js`)

Le store contient toutes les données et actions de l'application :

### 📊 **État (Data)**
```javascript
pokemonList: []        // Liste de tous les Pokémon
capturedPokemon: []    // Pokémon capturés
favorites: []          // IDs des Pokémon favoris
loading: false         // Indicateur de chargement
error: null           // Erreurs éventuelles
```

### ⚡ **Actions (Fonctions)**
```javascript
loadPokemonList()      // Charger les Pokémon
addCapturedPokemon()   // Capturer un Pokémon
removeCapturedPokemon() // Libérer un Pokémon
toggleFavorite()       // Ajouter/retirer des favoris
initialize()           // Initialiser l'application
```

## 💾 Persistance des Données

Les données importantes sont **automatiquement sauvegardées** :
- Pokémon capturés
- Favoris

Elles sont restaurées au redémarrage de l'application grâce à **AsyncStorage**.

## 🛠️ Comment Utiliser Zustand

### 1. **Importer le store**
```javascript
import { usePokemonStore } from '../store/pokemonStore';
```

### 2. **Utiliser dans un composant**
```javascript
const MonComposant = () => {
  // Récupérer les données et actions
  const { 
    pokemonList, 
    capturedPokemon, 
    loadPokemonList,
    addCapturedPokemon 
  } = usePokemonStore();

  // Utiliser les données
  return (
    <Text>J'ai {capturedPokemon.length} Pokémon</Text>
  );
};
```

### 3. **Appeler des actions**
```javascript
const capturerPokemon = async () => {
  await addCapturedPokemon(pokemon);
};
```

## 🧪 Test du Store

L'écran **"Test Zustand"** permet de :
- Voir l'état du store en temps réel
- Tester toutes les actions
- Comprendre comment Zustand fonctionne

## 🎯 Avantages de Zustand

### ✅ **Simple**
- Pas de configuration complexe
- Code facile à comprendre
- Moins de fichiers à gérer

### ✅ **Performant**
- Pas de re-render inutiles
- Rapide et léger

### ✅ **Automatique**
- Sauvegarde automatique
- Synchronisation entre écrans

## 📁 Structure des Fichiers

```
src/
├── screens/              # Écrans de l'application
│   ├── AccueilScreen.js         # 🏠 Accueil
│   ├── ListePokemonScreen.js    # 📋 Liste
│   ├── DetailPokemonScreen.js   # 🔍 Détails
│   ├── SimpleCollectionScreen.js # 📚 Collection
│   └── StoreTestScreen.js       # 🧪 Test Zustand
├── store/
│   └── pokemonStore.js          # 🧰 Store Zustand
└── navigation/
    └── SimpleAppNavigator.js    # 🧭 Navigation
```

## 🚀 Comment Démarrer

1. **Lancer l'application**
2. **Aller sur l'écran d'accueil** - voir les statistiques
3. **Explorer la liste** - voir tous les Pokémon
4. **Cliquer sur un Pokémon** - voir les détails
5. **Capturer des Pokémon** - construire votre collection
6. **Tester Zustand** - comprendre le fonctionnement

## 💡 Ce que Vous Apprenez

### 🎓 **Concepts Zustand**
- Store global
- Actions et état
- Persistance automatique
- Hook `usePokemonStore()`

### 🎓 **Concepts React Native**
- Navigation entre écrans
- Gestion d'état global
- Listes et images
- AsyncStorage

## 🔧 Prochaines Étapes

Une fois que vous maîtrisez cette version simple, vous pouvez :

1. **Ajouter des fonctionnalités**
   - Recherche de Pokémon
   - Filtres par type
   - Plus d'informations

2. **Améliorer l'interface**
   - Animations
   - Meilleurs styles
   - Icons

3. **Optimiser les performances**
   - Chargement paresseux
   - Cache intelligent

## 📚 Ressources

- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [React Navigation](https://reactnavigation.org/)
- [Pokémon API](https://pokeapi.co/)

---

🎉 **Félicitations !** Vous avez maintenant une application Pokédex simple qui utilise Zustand pour la gestion d'état !
