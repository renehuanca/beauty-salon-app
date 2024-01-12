import { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { View } from 'react-native';
import { Text } from '../components/StyledText'
import FormikTextInput from '../components/FormikInput';
import { loginSchema } from '../validations/login';
import { Link, router } from 'expo-router';
import { useSession } from '../contexts/ctx';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { signIn } = useSession();

  const fetchLogin = async (values: any) => {
    try {
      setLoading(true)

      const response = await globalThis.fetch('http://192.168.1.10:3000/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.status === 401) {
        Alert.alert('Error', 'Las credenciales son incorrectas')
      } else if (response.status === 200) {
        const data = await response.json()
        signIn(data.token)
        router.replace('/')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Ocurrio un error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/bg-top.png')} style={styles.image} />
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
        <Formik
          initialValues={{ email: 'jhon@gmail.com', password: 'secretpassword' }}
          validationSchema={loginSchema}
          onSubmit={values => fetchLogin(values)}
        >
          {({ handleSubmit }) => (
            <View>
              <Text fontWeight='bold' style={styles.title}>Login</Text>
              <Text style={styles.paragraph}>Por favor inicia sesión para continuar.</Text>
              <FormikTextInput
                name='email'
                placeholder='email'
                autoFocus
              />
              <Text fontWeight='bold' color='primary' style={styles.forgot}>¿Olvide mi contraseña?</Text>
              <FormikTextInput
                name='password'
                placeholder='password'
                secureTextEntry
              />
              {loading && <ActivityIndicator color={Colors.primary} />}
              <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} disabled={loading}>
                <LinearGradient colors={[Colors.primary, Colors.tertiary]} style={styles.button} end={{ x: 0, y: 0 }}>
                  <Text style={styles.button__text}>Continuar</Text>
                  <FontAwesome name="arrow-right" size={16} style={styles.button__icon} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.register}>
          <Text>¿No tengo una cuenta?</Text>
          <Link href="/register">
            <Text color='primary'>Registrate</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'Montserrat',
    marginBottom: 20
  },
  forgot: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    fontSize: 12,
  },
  button: {
    width: '100%',
    fontSize: 16,
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  button__text: {
    color: '#FFF',
    fontFamily: 'MontserratBold',
    lineHeight: 16,
    fontSize: 16,
  },
  button__icon: {
    color: '#FFF',
  },
  register: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6
  }
});

