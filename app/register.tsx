import { useState } from 'react';
import { ActivityIndicator, Alert, Button, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';

import FormikTextInput from '../components/FormikInput';
import { useSession } from '../contexts/ctx';
import { registerSchema } from '../validations/register';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../components/StyledText';

const windowDimensions = Dimensions.get('window');

const INITIAL_VALUES = {
  name: 'rene',
  email: 'rene9@gmail.com',
  phone_number: '78828568',
  address: 'av Uvinas',
  password: 'rene12345',
  password_confirmation: 'rene12345'
}

export default function Register() {
  const { signIn } = useSession();
  const [loading, setLoading] = useState(false)

  const handleRegister = async (values: any) => {
    try {
      setLoading(true)

      const response = await globalThis.fetch('http://192.168.1.10:3000/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.status === 422) {
        Alert.alert('Error', 'Las credenciales son incorrectas')
        const data = await response.json()
        if (data.errors.email) {
          Alert.alert('Error', 'El correo ya tiene una cuenta')
        }
      } else if (response.status === 201) {
        const data = await response.json()
        signIn(data.token)
        router.replace('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={require('../assets/images/bg-top.png')} imageStyle={styles.backgroundImageStyle} style={styles.backgroundImage}>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={registerSchema}
          onSubmit={values => handleRegister(values)}
        >
          {({ handleSubmit }) => (
            <View style={styles.register_container}>
              <FontAwesome onPress={() => router.replace('/login')} name='arrow-left' size={24} />
              <Text fontWeight='bold' style={styles.title}>Registrar</Text>
              <Text style={styles.paragraph}>Por favor ingresa tus datos.</Text>
              <FormikTextInput
                name='name'
                placeholder='Ingresa tu nombre'
                autoFocus
              />
              <FormikTextInput
                name='email'
                placeholder='Ingresa tu correo'
                autoCapitalize='none'
              />
              <FormikTextInput
                name='phone_number'
                placeholder='Ingresa tu Nro de celular'
                keyboardType='numeric'
              />
              <FormikTextInput
                name='address'
                placeholder='Ingresa tu Direccion'
              />
              <FormikTextInput
                name='password'
                placeholder='password'
                autoCapitalize='none'
                secureTextEntry
              />
              <FormikTextInput
                name='password_confirmation'
                placeholder='password confirmation'
                autoCapitalize='none'
                secureTextEntry
              />
              {loading && <ActivityIndicator color={Colors.primary} />}
              <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
                <LinearGradient colors={[Colors.primary, Colors.tertiary]} style={styles.button} end={{ x: 0, y: 0 }}>
                  <Text style={styles.button__text}>Registrar</Text>
                  <FontAwesome name='save' size={16} style={styles.button__icon} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.register}>
          <Text>Ya tengo una cuenta</Text>
          <Text
            color='primary'
            onPress={() => {
              router.replace('/login');
            }}
          >Iniciar Sesion</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImageStyle: {
    width: 134,
    height: 120,
    left: windowDimensions.width - 134,
    resizeMode: 'cover',
    alignSelf: 'flex-end'
  },
  register_container: {
    flex: 1,
    paddingTop: 64,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 48,
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'Montserrat',
    marginBottom: 20
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