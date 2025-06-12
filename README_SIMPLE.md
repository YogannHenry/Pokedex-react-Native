# 📱 Pokédex Simple avec Zustand

Une application React Native simple pour apprendre **Zustand** avec des Pokémon !

## 🎯 Objectif

Cette application a été créée spécialement pour les **débutants** qui veulent apprendre **Zustand** (gestion d'état) avec un exemple concret et amusant.

## ✨ Fonctionnalités

### 🏠 **Accueil**
- Statistiques de votre collection en temps réel
- Navigation vers les autres écrans
- Données du store Zustand affichées

### 📋 **Liste des Pokémon**  
- Grille de tous les Pokémon disponibles
- Images et noms
- Badges "Capturé" visibles

### 🔍 **Détails d'un Pokémon**
- Informations complètes (taille, poids, types, stats)
- Bouton **Capturer/Libérer**
- Système de **favoris**

### 📚 **Ma Collection**
- Pokémon capturés uniquement
- Badges favoris
- Message si collection vide

### 🧪 **Test Zustand**
- Écran pour comprendre le store
- Test de toutes les actions
- État en temps réel

## 🧰 Technologies

- **React Native** - Framework mobile
- **Zustand** - Gestion d'état simple
- **AsyncStorage** - Persistance automatique
- **React Navigation** - Navigation entre écrans
- **PokéAPI** - Données des Pokémon

## 🚀 Installation

```bash
# 1. Cloner le projet
git clone [url-du-repo]
cd pokedex

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm start
```

## 📁 Structure Simple

```
src/
├── screens/           # 5 écrans simples
├── store/            # Store Zustand
├── services/         # API et stockage
├── navigation/       # Navigation 3 onglets
└── components/       # ErrorBoundary seulement
```

## 🎓 Apprentissage Zustand

### **Store Global** (`pokemonStore.js`)
```javascript
// Utilisation simple
const { pokemonList, capturedPokemon } = usePokemonStore();

// Actions
const { addCapturedPokemon, toggleFavorite } = usePokemonStore();
```

### **Persistance Automatique**
- Pokémon capturés sauvegardés
- Favoris conservés
- Restauration au redémarrage

### **État Partagé**
- Données synchronisées entre écrans
- Pas de props drilling
- Performance optimisée

## 📚 Guides

- **[GUIDE_SIMPLE.md](GUIDE_SIMPLE.md)** - Guide complet pour débutants
- **[MODIFICATIONS.md](MODIFICATIONS.md)** - Historique des changements
- **[NETTOYAGE.md](NETTOYAGE.md)** - Fichiers supprimés

## 🧪 Comment Tester

1. **Lancer l'app** avec `npm start`
2. **Écran Accueil** - Voir les stats du store
3. **Liste Pokémon** - Explorer et cliquer
4. **Détails** - Capturer des Pokémon  
5. **Collection** - Voir vos captures
6. **Test Zustand** - Comprendre le fonctionnement

## ✅ Fonctionnalités Zustand Démontrées

- ✅ Store global partagé
- ✅ Actions asynchrones  
- ✅ Persistance AsyncStorage
- ✅ État réactif
- ✅ Performance optimisée
- ✅ Code simple et lisible

## 🎉 Parfait pour Apprendre !

Cette application est idéale pour :
- **Découvrir Zustand** avec un exemple concret
- **Comprendre la gestion d'état** globale
- **Voir la persistance** en action
- **Apprendre React Native** avec un projet fun

---

💡 **Conseil** : Commencez par l'écran "Test Zustand" pour comprendre le store, puis explorez les autres écrans !
