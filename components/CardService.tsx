import { Text, ImageSourcePropType, Button, ImageBackground, View, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import Fonts from "../constants/Fonts"
import { LinearGradient } from "expo-linear-gradient"

interface Props {
    name: string,
    source: ImageSourcePropType
}

export default function CardService({ name, source }: Props) {
    return (
        <View style={styles.container}>
            <ImageBackground source={source} resizeMode="cover" style={styles.image} imageStyle={styles.imageStyles}>
                <View style={styles.black} >
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.buttons}>
                        <Button onPress={() => { }} title="16Bs" color={'#444'} />
                        <Button onPress={() => { console.log('hola') }} title="Reservar Ahora" color={Colors.primary} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        height: 440,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    imageStyles: {
        borderRadius: 16
    },
    title: {
        color: '#fff',
        fontFamily: Fonts.bold,
        fontSize: 16,
        paddingBottom: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    black: {
        backgroundColor: 'black',
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
        padding: 16
    }
})