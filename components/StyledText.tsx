import { Text as DefaultText, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

interface Props {
  fontWeight?: string,
  color?: string
}

type TextProps = DefaultText['props'] & Props

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: Colors.paragraph,
    fontFamily: Fonts.normal
  },
  textNormal: {
    fontFamily: Fonts.normal
  },
  textBold: {
    fontFamily: Fonts.bold,
    color: Colors.headingColor
  },
  textBlack: {
    fontFamily: Fonts.black,
    color: Colors.headingColor
  },
  colorPrimary: {
    color: Colors.primary
  }
})

export function Text({ style, fontWeight, color, ...props }: TextProps) {
  const textStyles = [
    styles.default,
    fontWeight === 'normal' && styles.textNormal,
    fontWeight === 'bold' && styles.textBold,
    fontWeight === 'black' && styles.textBlack,
    color === 'primary' && styles.colorPrimary,
    style,
  ]

  return <DefaultText {...props} style={textStyles} />
}
