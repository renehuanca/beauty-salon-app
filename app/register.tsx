import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../contexts/ctx';

export default function Register() {
  const { signIn } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/login');
        }}>
        Y tengo una cuenta
      </Text>
    </View>
  );
}
