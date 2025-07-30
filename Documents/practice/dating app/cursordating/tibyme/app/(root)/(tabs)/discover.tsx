import SwappableCard from '@/components/comcompo/SwappableCard';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      {/* Header */}
     <View className="absolute top-0 w-full bg-[#E8E0F9] z-10 px-5 pt-14 pb-5 shadow-sm">
                       {/* Back Button */}
                       <TouchableOpacity 
                         className="absolute top-14 left-5 p-2 rounded-full active:bg-gray-200"
                         onPress={() => navigation.goBack()}
                         activeOpacity={0.7}
                       >
                         <Ionicons name="arrow-back" size={24} color="#000" />
                       </TouchableOpacity>
           
                       {/* Title */}
                       <Text className="text-center text-xl font-semibold text-black">Liked You</Text>
           
                       {/* Settings Button with Navigation */}
                       <TouchableOpacity 
                         className="absolute top-14 right-5 p-2 rounded-full active:bg-gray-200"
                         onPress={() => router.replace('/(root)/find-people')}
                         activeOpacity={0.7}
                       >
                         <Ionicons name="search" size={24} color="#000" />
                       </TouchableOpacity>
                     </View >
     

      {/* Card Stack */}
      <View className="flex-1 justify-center items-center px-6 mt-4">
        <SwappableCard  />
      </View>
    </SafeAreaView>
  );
}




