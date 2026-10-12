import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../src/config/firebaseConfig';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import colors from '../src/theme/colors';
import fonts from '../src/theme/fonts';

const Stack = createStackNavigator();

export default function Navigation() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Falta configurar Firebase. Copia .env.example como .env y completa los datos de tu proyecto.
        </Text>
      </View>
    );
  }

  if (user === undefined) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 3, // Sombra para Android
            shadowColor: '#000', // Sombra para iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: fonts.bold,
            fontSize: 18,
          },
          headerTitleAlign: 'center', // Centrado en Android e iOS
          headerBackTitleVisible: false, // Oculta texto secundario de retorno en iOS
          cardStyle: { backgroundColor: '#F8F9FA' },
        }}
      >
        {user ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Mudanzas Salta - Inicio' }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Iniciar Sesión' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: 'Crear Cuenta' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8F9FA',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});
