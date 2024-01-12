import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { useSession } from '../../contexts/ctx';

export default function Index() {
  const { signOut, session } = useSession();

  useEffect(() => {
    console.log(session)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
      <Text>Token: {session}</Text>
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
