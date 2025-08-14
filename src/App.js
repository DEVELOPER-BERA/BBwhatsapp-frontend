// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';
import { StatusBar } from 'react-native';
import { colors } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
