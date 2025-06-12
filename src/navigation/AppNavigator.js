import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CaptureScreen from '../screens/CaptureScreen';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import CollectionScreen from '../screens/CollectionScreen';
import StoreTestScreen from '../screens/StoreTestScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ title: 'Pokédex' }}
      />
      <Stack.Screen 
        name="PokemonList" 
        component={PokemonListScreen}
        options={{ title: 'All Pokémon' }}
      />
      <Stack.Screen 
        name="PokemonDetail" 
        component={PokemonDetailScreen}
        options={{ title: 'Pokémon Details' }}
      />
      <Stack.Screen 
        name="StoreTest" 
        component={StoreTestScreen}
        options={{ title: 'Zustand Store Test' }}
      />
    </Stack.Navigator>
  );
}

function CaptureStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CaptureMain" 
        component={CaptureScreen} 
        options={{ title: 'Capture Pokémon' }}
      />
    </Stack.Navigator>
  );
}

function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CollectionMain" 
        component={CollectionScreen} 
        options={{ title: 'My Collection' }}
      />
      <Stack.Screen 
        name="PokemonDetail" 
        component={PokemonDetailScreen}
        options={{ title: 'Pokémon Details' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Capture') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'library' : 'library-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e74c3c',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Capture" component={CaptureStack} />
        <Tab.Screen name="Collection" component={CollectionStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
