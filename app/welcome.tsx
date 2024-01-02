import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Welcome() {
    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Link href='/login'>
                Continuar
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
});