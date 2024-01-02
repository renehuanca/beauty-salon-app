import { Alert, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { View } from '../components/Themed';
import FormikTextInput from '../components/FormikInput';
import { loginSchema } from '../validations/login';

export default function Login() {
  const fetchLogin = async (values: any) => {
    try {
      const response = await globalThis.fetch('http://192.168.1.4:8080/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.status === 401) {
        Alert.alert('Error', 'Las credenciales son incorrectas')
      }

      if (response.status === 200) {
        Alert.alert('Hola', 'Bienvenido')
      }

      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }

  return (
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
            <Button onPress={handleSubmit} title="Submit" />
          </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

