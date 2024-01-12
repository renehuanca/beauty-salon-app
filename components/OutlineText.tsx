import { StyleSheet, Text, View } from "react-native";

export default function OutlineText(props: any) {
    const text = props.children;

    return (
        <View>
          <Text style={[styles.paragraph]}>{text}</Text>
          <Text style={[styles.paragraph, styles.abs, {textShadowOffset: {width: -1, height: -1}}]}>{text}</Text> 
          <Text style={[styles.paragraph, styles.abs, {textShadowOffset: {width: -1, height: 1}}]}>{text}</Text>
          <Text style={[styles.paragraph, styles.abs, {textShadowOffset: {width: 1, height: -1}}]}>{text}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({
  paragraph: {
    color: '#FFF',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: { 
      width: 1,
      height: 1,
    },
    fontFamily: 'MontserratBlack',
    fontSize: 64,
  }, 
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});