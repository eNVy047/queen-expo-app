// components/ComingSoon.tsx
import React from "react";
import { View, Text } from "react-native";

export default function ComingSoon({ color = "#000" }: { color?: string }) {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-gray-50 ">
      <View className="mb-8">
        <View className="w-32 h-32 rounded-full bg-indigo-100  items-center justify-center">
          <Text className="text-5xl" style={{ color }}>🚀</Text>
        </View>
      </View>
      
      <Text 
        className="text-3xl font-bold text-center mb-4 text-purple-800 "
      >
        Coming Soon!
      </Text>
      
      <Text className="text-lg text-center text-gray-900 dark:text-gray-300 mb-8">
        We're working hard to bring you something amazing. Stay tuned for updates!
      </Text>
    </View>
  );
}