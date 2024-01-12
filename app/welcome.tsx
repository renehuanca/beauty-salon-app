import { Link, router } from 'expo-router';
import { Text, View, StyleSheet, ImageBackground, Image, Pressable, TouchableOpacity } from 'react-native';
import OutlineText from '../components/OutlineText';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {

    const handleClick = () => {
        router.replace('/login');
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../assets/images/bg-welcome.png')} />
                <Image source={require('../assets/images/logo.png')} />
                <OutlineText>Beauty</OutlineText>
                <Text style={styles.title}>Salon</Text>
                <Text style={styles.paragraph}>Bienvenido a nuestra app, podra realizar reservas de servicios de belleza.</Text>
            </View>
            <TouchableOpacity onPress={handleClick} style={styles.button}>
                <LinearGradient colors={[Colors.primary, Colors.tertiary]} style={styles.button} end={{ x: 0, y: 0 }}>
                    <Text style={styles.button__text}>Continuar</Text>
                    <FontAwesome name="arrow-right" size={16} style={styles.button__icon} />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        color: Colors.headingColor,
        fontFamily: 'MontserratBlack',
        fontSize: 64,
        marginTop: -20,
    },
    paragraph: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        textAlign: 'center',
        color: Colors.paragraph,
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
    }
});