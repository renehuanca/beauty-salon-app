import { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { View } from '../components/Themed';
import FormikTextInput from '../components/FormikInput';
import { loginSchema } from '../validations/login';
import { Link, router } from 'expo-router';
import { useSession } from '../contexts/ctx';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { signIn } = useSession();

  const fetchLogin = async (values: any) => {
    try {
      setLoading(true)

      const response = await globalThis.fetch('http://192.168.1.4:8080/api/v1/login', {
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
    <>
    <Formik
      initialValues={{ email: 'jhon@gmail.com', password: 'secretpassword' }}
      validationSchema={loginSchema}
      onSubmit={values => fetchLogin(values)}
    >
      {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput
              name='email'
              placeholder='email'
              autoFocus
            />
            <FormikTextInput
              name='password'
              placeholder='password'
              secureTextEntry
            />
            {loading && <ActivityIndicator />}
            {loading}
            <Button onPress={handleSubmit} title="Submit" disabled={loading}/>
          </View>
      )}
    </Formik>
    <Link href="/register">Crear Una Cuenta</Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

