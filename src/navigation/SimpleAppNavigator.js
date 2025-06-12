import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Écrans simples
import AccueilScreen from '../screens/AccueilScreen';
import ListePokemonScreen from '../screens/ListePokemonScreen';
import DetailPokemonScreen from '../screens/DetailPokemonScreen';
import SimpleCollectionScreen from '../screens/SimpleCollectionScreen';
import StoreTestScreen from '../screens/StoreTestScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navigation par onglets avec stack pour les détails
function AccueilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AccueilMain" 
        component={AccueilScreen} 
        options={{ title: 'Accueil' }}
      />
      <Stack.Screen 
        name="ListePokemon" 
        component={ListePokemonScreen}
        options={{ title: 'Liste des Pokémon' }}
      />
      <Stack.Screen 
        name="DetailPokemon" 
        component={DetailPokemonScreen}
        options={{ title: 'Détails' }}
      />
      <Stack.Screen 
        name="StoreTest" 
        component={StoreTestScreen}
        options={{ title: 'Test Zustand' }}
      />
    </Stack.Navigator>
  );
}

function ListeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListeMain" 
        component={ListePokemonScreen}
        options={{ title: 'Tous les Pokémon' }}
      />
      <Stack.Screen 
        name="DetailPokemon" 
        component={DetailPokemonScreen}
        options={{ title: 'Détails' }}
      />
    </Stack.Navigator>
  );
}

function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CollectionMain" 
        component={SimpleCollectionScreen}
        options={{ title: 'Ma Collection' }}
      />
      <Stack.Screen 
        name="DetailPokemon" 
        component={DetailPokemonScreen}
        options={{ title: 'Détails' }}
      />
    </Stack.Navigator>
  );
}

export default function SimpleAppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4285f4',
          tabBarInactiveTintColor: '#666',
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Accueil" 
          component={AccueilStack}
          options={{
            tabBarLabel: 'Accueil',
          }}
        />
        <Tab.Screen 
          name="Liste" 
          component={ListeStack}
          options={{
            tabBarLabel: 'Pokémon',
          }}
        />
        <Tab.Screen 
          name="Collection" 
          component={CollectionStack}
          options={{
            tabBarLabel: 'Collection',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
