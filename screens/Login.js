import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import colors from '../src/theme/colors';
import fonts from '../src/theme/fonts';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Campos requeridos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("¡Bienvenido!", "Has iniciado sesión correctamente.");
      // Firebase actualiza el estado de autenticación y navega a Home.
    } catch (error) {
      console.error('Error de inicio de sesión:', error.code, error.message);
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          errorMessage = "El correo o la contraseña son incorrectos.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró un usuario con este correo.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión. Revisa tu acceso a internet.";
          break;
        case 'auth/invalid-api-key':
          errorMessage = "La clave API de Firebase no es válida. Revisa el archivo .env.";
          break;
      }
      Alert.alert("Error de acceso", `${errorMessage}\n\nCódigo: ${error.code ?? 'desconocido'}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>¡Bienvenido a Mudanzas Salta!</Text>
          <Text style={styles.subtitle}>Ingresa con tu cuenta para continuar</Text>

          <Text style={styles.label}>Correo Electrónico</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={18} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={18}
                color={colors.primaryDark}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.7}
          >
            <Text style={styles.signUpText}>
              ¿No tienes cuenta aún? <Text style={styles.signUpTextBold}>Regístrate acá</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0B2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo: {
    width: 220,
    height: 110,
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signUpButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
  signUpText: {
    fontFamily: fonts.regular,
    color: colors.textMuted,
    fontSize: 14,
  },
  signUpTextBold: {
    fontFamily: fonts.bold,
    color: colors.primaryDark,
  },
});
