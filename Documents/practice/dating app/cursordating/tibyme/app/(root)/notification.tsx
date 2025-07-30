import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

const notifications = {
  today: [
    {
      id: 1,
      username: '@aanya',
      action: 'followed you',
      date: '26/06/2025',
      time: '13 mins ago',
    },
    {
      id: 2,
      username: '@zara',
      action: 'commented on',
      date: '26/06/2025',
      time: '2 hours ago',
    },
    {
      id: 3,
      username: '@elina',
      action: 'loved your photo',
      date: '26/06/2025',
      time: '3 hours ago',
    },
  ],
  previous: [
    {
      id: 4,
      username: '@sophia',
      action: 'commented on',
      date: '25/06/2025',
      time: '1 day ago',
    },
    {
      id: 5,
      username: '@saanvi',
      action: 'requested you',
      date: '24/06/2025',
      time: '2 days ago',
      request: true,
    },
    {
      id: 6,
      username: '@nora',
      action: 'followed you',
      date: '23/06/2025',
      time: '3 days ago',
    },
  ],
};

const NotificationItem = ({ item }: { item: any }) => (
  <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-start justify-between shadow-sm">
    <View className="flex-row space-x-3 flex-1">
      {/* Placeholder avatar */}
      <View className="w-10 h-10 rounded-full bg-gray-200" />
      <View className="flex-1">
        <Text className="text-base text-black">
          <Text className="font-semibold text-[#2F2F2F]">{item.username}</Text> {item.action}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">{item.date}</Text>
        {item.request && (
          <View className="flex-row space-x-2 mt-2">
            <TouchableOpacity className="px-3 py-1 rounded-lg border border-gray-300">
              <Text className="text-sm text-gray-600">Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1 rounded-lg bg-gray-300">
              <Text className="text-sm text-black">Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    <Text className="text-xs text-gray-400">{item.time}</Text>
  </View>
);

export default function NotificationScreen() {
  const navigation = useNavigation();
    const handleGoBack = () => {
   if (navigation.canGoBack()) {
  navigation.goBack();
} else {
  router.replace('/(root)/(tabs)/likedyou'); // or any fallback screen
}
  };
  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FB]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-6 pb-4 bg-white rounded-b-3xl shadow-md">
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-black">Notification</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-5 mt-4">
        {/* Today */}
        <Text className="text-sm font-medium text-gray-500 mb-3">Today</Text>
        {notifications.today.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}

        {/* Previous */}
        <Text className="text-sm font-medium text-gray-500 mt-5 mb-3">Previous</Text>
        {notifications.previous.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}

        <View className="mb-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
