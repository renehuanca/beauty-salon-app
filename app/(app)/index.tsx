import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'

import { useSession } from '../../contexts/ctx';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { Text } from '../../components/StyledText'
import { FontAwesome } from '@expo/vector-icons';
import CardService from '../../components/CardService';

const GROUP = [
  [
    {
      id: 1,
      name: 'Maquillaje de noche',
      image: require('../../assets/images/make-up-1.png'),
    },
    {
      id: 2,
      name: 'Maquillaje de dia',
      image: require('../../assets/images/make-up-2.png'),
    },
  ],
  [
    {
      id: 3,
      name: 'Servicio de unas',
      image: require('../../assets/images/nails-1.png'),
    }
  ]
]

export default function Index() {
  const { signOut, session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClickServices = (type: string) => {
    if (type === 'make-up') setCurrentIndex(0)
    if (type === 'nails') setCurrentIndex(1)
    if (type === 'eyelashes') setCurrentIndex(2)
    if (type === 'hair-salon') setCurrentIndex(3)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <FontAwesome name='user-o' size={20} />
        <FontAwesome name='heart-o' size={20} />
      </View>
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.info} end={{ x: 0, y: 0 }}>
        <Text fontWeight='bold' color='white' style={{ fontSize: 24 }}>Zona de Belleza</Text>
        <Text color='white'>Una amplia gama de servicios y especialistas calificados</Text>
      </LinearGradient>
      <ScrollView horizontal={true} contentContainerStyle={{
        paddingVertical: 16,
        gap: 16,
      }}>
        <TouchableOpacity style={styles.tabService} onPress={() => handleClickServices('make-up')}>
          <Image source={require('../../assets/images/make-up-icon.png')} />
          <Text style={{ color: Colors.primary }}>Maquillaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabService} onPress={() => handleClickServices('nails')}>
          <Image source={require('../../assets/images/nails-icon.png')} />
          <Text style={{ color: Colors.primary }}>Servicio de uñas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabService} onPress={() => handleClickServices('eyelashes')}>
          <Image source={require('../../assets/images/eyelashes-icon.png')} />
          <Text style={{ color: Colors.primary }}>Pestañas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabService} onPress={() => handleClickServices('hair-salon')}>
          <Image source={require('../../assets/images/hair-salon-icon.png')} />
          <Text style={{ color: Colors.primary }}>Peluqueria</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView horizontal={true} contentContainerStyle={{
        gap: 16
      }}>
        {GROUP[currentIndex].map((service) => {
          return <CardService key={service.id} source={service.image} name={service.name} />
        })}
      </ScrollView>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
  },
  info: {
    borderRadius: 8,
    padding: 16,
    gap: 16
  },
  scrollServices: {
    height: 16,
    backgroundColor: Colors.primary
  },
  tabService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    color: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary,
    borderRadius: 16,
    backgroundColor: '#FEEDED'
  }
})
