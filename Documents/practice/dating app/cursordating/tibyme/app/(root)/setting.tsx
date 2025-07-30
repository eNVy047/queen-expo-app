import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [weeklyEnabled, setWeeklyEnabled] = useState(false);
  const navigation = useNavigation();
  const handleGoBack = () => {
     if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    router.replace('/(root)/(tabs)/profile'); // or any fallback screen
  }
  }
  const { logout } = useAuth();
  const handleLogout = async () => {
  try {
    await logout();
    router.push('/(auth)/sign-in'); // ✅ Adjust path if needed
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-6 pb-4 bg-white rounded-b-3xl shadow-md">
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-black">Settings</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Settings Content */}
      <ScrollView className="px-5 mt-6" showsVerticalScrollIndicator={false}>
        {/* Personal Info Section */}
        <Text className="text-sm text-gray-500 font-semibold mb-2">Personal Information</Text>
        <View className="bg-white rounded-2xl px-4 py-5 space-y-5 mb-6">
          {[
            {
              icon: <Ionicons name="location-outline" size={20} color="#000" />,
              label: 'Privacy Centre',
            },
            {
              icon: <MaterialCommunityIcons name="account-circle-outline" size={20} color="#000" />,
              label: 'Account Status',
            },
            {
              icon: <Feather name="link" size={20} color="#000" />,
              label: 'Link History',
            },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center p-2 justify-between"
            >
              <View className="flex-row items-center space-x-4">
                {item.icon}
                <Text className="text-base text-black">{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Notification Section */}
        <Text className="text-sm text-gray-500 font-semibold mb-2">Notification Settings</Text>
        <View className="bg-white rounded-2xl px-4 py-5 space-y-5 mb-6">
          {[
            {
              icon: <MaterialCommunityIcons name="bell-ring-outline" size={20} color="#000" />,
              label: 'Push Notification',
              state: pushEnabled,
              setter: setPushEnabled,
            },
            {
              icon: <Feather name="mail" size={20} color="#000" />,
              label: 'Email Notification',
              state: emailEnabled,
              setter: setEmailEnabled,
            },
            {
              icon: <Feather name="message-square" size={20} color="#000" />,
              label: 'SMS Notification',
              state: smsEnabled,
              setter: setSmsEnabled,
            },
            {
              icon: <FontAwesome5 name="calendar-week" size={18} color="#000" />,
              label: 'Weekly Notification',
              state: weeklyEnabled,
              setter: setWeeklyEnabled,
            },
          ].map((item, idx) => (
            <View
              key={idx}
              className="flex-row items-center p-1 justify-between"
            >
              <View className="flex-row items-center space-x-4">
                {item.icon}
                <Text className="text-base text-black">{item.label}</Text>
              </View>
              <Switch
                value={item.state}
                onValueChange={item.setter}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor={item.state ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        {/* Other Settings */}
        <Text className="text-sm text-gray-500 font-semibold mb-2">Other Settings</Text>
        <View className="bg-white rounded-2xl px-4 py-5 mb-10 space-y-4">
  <TouchableOpacity className="flex-row items-center justify-between">
    <View className="flex-row items-center space-x-4">
      <Feather name="search" size={20} color="#000" />
      <Text className="text-base text-black">Search History</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#000" />
  </TouchableOpacity>

  <TouchableOpacity className="flex-row items-center justify-between" onPress={handleLogout}>
    <View className="flex-row items-center space-x-4 ">
      <SimpleLineIcons name="logout" size={20} color="#F52E2E" />
      <Text className="text-base text-[#F52E2E] ml-2">logout</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#000" />
  </TouchableOpacity>
</View>

        
      </ScrollView>
    </SafeAreaView>
  );
}
