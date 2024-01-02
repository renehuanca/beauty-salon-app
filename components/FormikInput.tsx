import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

import { StyledTextInput as TextInput } from '../components/StyledTextInput';

interface FormkInputProps {
  name: string,
  [key: string]: any
}

const FormikTextInput = ({ name, ...props }: FormkInputProps) => {
  const [field, meta, helpers] = useField(name)

  return (
    <>
    <TextInput
      value={field.value}
      onChangeText={value => helpers.setValue(value)}
      onBlur={() => helpers.setTouched(true)}
      error={!!(meta.touched && meta.error)}
      {...props}
    />
    {meta.touched && meta.error && <Text style={styles.textError}>{meta.error}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 20,
  }
})

export default FormikTextInput;
