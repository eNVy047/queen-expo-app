import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { Text, View, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // Hide this log once fixed
]);


const Page = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(root)/(tabs)/discover" : "/(auth)/welcome"} />;
};

export default Page;
