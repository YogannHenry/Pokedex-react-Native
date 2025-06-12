# Pokémon Capture Game

A React Native mobile app built with Expo that allows users to discover, capture, and collect Pokémon using the PokéAPI. The app features a modern UI with navigation tabs, capture mechanics, and persistent storage.

## Features

### 🎮 Core Gameplay
- **Random Pokémon Encounters**: Discover random Pokémon with varying capture rates
- **Capture Mechanics**: Dynamic capture probability based on Pokémon stats
- **Collection System**: Save and manage captured Pokémon locally
- **Pokémon Browser**: Browse all available Pokémon with search capabilities

### 📱 User Interface
- **Tab Navigation**: Home, Capture, and Collection tabs
- **Stack Navigation**: Detailed screens with proper navigation flow
- **Responsive Design**: Optimized for mobile devices
- **Modern Styling**: Clean, Pokémon-themed UI with type-based color coding
- **Smooth Animations**: Enhanced user experience with capture animations

### 💾 Data Management
- **Async Storage**: Persistent local storage for captured Pokémon
- **PokéAPI Integration**: Real-time data from the official Pokémon API
- **Offline Support**: View captured Pokémon without internet connection
- **Collection Statistics**: Track your progress and achievements

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Storage**: AsyncStorage for persistent data
- **API**: PokéAPI (https://pokeapi.co/)
- **Styling**: StyleSheet with custom design system
- **Icons**: Expo Vector Icons
- **Animations**: React Native Animated API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PokemonCard.js   # Pokémon display card
│   ├── LoadingScreen.js # Loading state component
│   └── ErrorBoundary.js # Error handling wrapper
├── navigation/          # Navigation configuration
│   └── AppNavigator.js  # Main navigation setup
├── screens/            # App screens
│   ├── HomeScreen.js    # Dashboard with stats and featured Pokémon
│   ├── CaptureScreen.js # Pokémon capture gameplay
│   ├── CollectionScreen.js # User's captured Pokémon
│   ├── PokemonListScreen.js # Browse all Pokémon
│   └── PokemonDetailScreen.js # Detailed Pokémon information
├── services/           # API and data services
│   ├── PokeAPI.js      # PokéAPI integration
│   └── StorageService.js # AsyncStorage wrapper
├── styles/             # Styling and theming
│   └── globalStyles.js  # Global styles and colors
└── utils/              # Utility functions
    └── helpers.js       # Helper functions and formatters
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`
   - **Web**: `npm run web`

## Key Features Explained

### Capture System
- Random Pokémon encounters with calculated capture rates
- Success probability based on Pokémon base stats
- Visual feedback and animations during capture attempts
- Prevents duplicate captures with status indicators

### Collection Management
- Persistent storage using AsyncStorage
- View all captured Pokémon in a grid layout
- Detailed stats and information for each Pokémon
- Release Pokémon from collection if desired

### Data Integration
- Real-time data from PokéAPI
- Comprehensive Pokémon information including:
  - Base stats and abilities
  - Types with color-coded displays
  - Multiple sprite variations
  - Physical characteristics (height, weight)

### UI/UX Design
- Type-based color theming
- Responsive card layouts
- Smooth navigation transitions
- Loading states and error handling
- Pull-to-refresh functionality

## Development Notes

### Architecture Decisions
- **Component-based structure** for reusability and maintainability
- **Service layer** for API calls and data management
- **Global styling system** for consistent theming
- **Error boundaries** for graceful error handling

### Performance Optimizations
- Lazy loading for Pokémon list
- Image caching for better performance
- Efficient re-renders with proper state management
- Optimized FlatList for large datasets

### Future Enhancements
- [ ] Pokémon search and filtering
- [ ] Battle system between captured Pokémon
- [ ] Trading mechanism
- [ ] Achievement system
- [ ] Pokémon evolution mechanics
- [ ] Social features and sharing

## Dependencies

```json
{
  "expo": "~53.0.11",
  "react": "19.0.0",
  "react-native": "0.79.3",
  "@react-navigation/native": "latest",
  "@react-navigation/bottom-tabs": "latest",
  "@react-navigation/stack": "latest",
  "@react-native-async-storage/async-storage": "latest",
  "react-native-screens": "latest",
  "react-native-safe-area-context": "latest",
  "expo-linear-gradient": "latest"
}
```

## API Reference

This app uses the [PokéAPI](https://pokeapi.co/) which provides:
- Pokémon data (stats, types, abilities, sprites)
- Type information and relationships
- Species information and descriptions
- No authentication required
- Rate limiting: reasonable use policy

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Testing thoroughly
5. Submitting a pull request

## License

This project is for educational purposes. Pokémon and related trademarks are property of Nintendo, Game Freak, and The Pokémon Company.
