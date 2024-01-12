import { StyleSheet } from 'react-native';

import { TextInput, TextInputProps } from 'react-native';
import Colors from '../constants/Colors';

export function StyledTextInput(props: TextInputProps & { error: boolean }) {
  const inputStyles = [
    styles.textInput,
    props.style,
    props.error && styles.error,
  ]

  return <TextInput {...props} style={inputStyles} />;
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: 'red',
  }
})
