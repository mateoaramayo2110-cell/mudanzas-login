import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import colors from '../src/theme/colors';
import fonts from '../src/theme/fonts';

export default function Home({ navigation }) {
  const [userName, setUserName] = useState(auth?.currentUser?.displayName || 'Usuario');
  const userEmail = auth?.currentUser?.email || '';

  useEffect(() => {
    if (auth?.currentUser) {
      if (!auth.currentUser.displayName) {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser?.displayName) {
            setUserName(auth.currentUser.displayName);
          }
        }).catch(() => {});
      } else {
        setUserName(auth.currentUser.displayName);
      }
    }
  }, []);

  const handleLogOut = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar tu sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              Alert.alert("Sesión finalizada", "Has cerrado sesión correctamente.");
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al cerrar sesión.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardHeader}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>¡Hola, {userName}!</Text>
        {userEmail ? <Text style={styles.emailText}>{userEmail}</Text> : null}
      </View>

      <View style={styles.infoCard}>
        <View style={styles.badgeContainer}>
          <FontAwesome name="check-circle" size={16} color="#2ECC71" style={{ marginRight: 6 }} />
          <Text style={styles.badgeText}>Cuenta Verificada</Text>
        </View>

        <Text style={styles.infoTitle}>Mudanzas y Fletes en Salta</Text>
        <Text style={styles.infoDescription}>
          Bienvenido a la plataforma de Mudanzas Salta. Tu servicio de transporte y logística rápida dentro de Salta Capital y alrededores.
        </Text>

        <View style={styles.featureRow}>
          <FontAwesome name="truck" size={18} color={colors.primary} style={styles.featureIcon} />
          <Text style={styles.featureText}>Flota de camionetas y fletes habilitados</Text>
        </View>

        <View style={styles.featureRow}>
          <FontAwesome name="shield" size={18} color={colors.primary} style={styles.featureIcon} />
          <Text style={styles.featureText}>Carga segura y traslados garantizados</Text>
        </View>

        <View style={styles.featureRow}>
          <FontAwesome name="clock-o" size={18} color={colors.primary} style={styles.featureIcon} />
          <Text style={styles.featureText}>Atención y puntualidad en cada viaje</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={handleLogOut}
        activeOpacity={0.85}
      >
        <FontAwesome name="sign-out" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonLogoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  cardHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 8,
  },
  welcomeText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textDark,
    textAlign: 'center',
  },
  emailText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#117A65',
  },
  infoTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 8,
  },
  infoDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  featureIcon: {
    width: 26,
    textAlign: 'center',
    marginRight: 10,
  },
  featureText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
  buttonLogout: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.danger,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonLogoutText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
