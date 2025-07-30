import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React from "react";
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

const users = [
  { id: '1', name: 'Bellara', age: 24, image: 'https://example.com/images/bellara.jpg' },
  { id: '2', name: 'Vivaya', age: 21, image: 'https://example.com/images/vivaya.jpg' },
  // Add more as needed...
];

export default function LikedYouScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#F0ECF9]">
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
                    onPress={() => router.replace('/(root)/notification')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View >

      {/* Search Bar */}
      <View className="flex-row items-center px-5 pt-5 mt-10">
        <View className="flex-1 flex-row items-center bg-white px-4 py-4 rounded-full">
          <Ionicons name="search-outline" size={20} color="#777" className="mr-2" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            className="flex-1 text-black"
          />
        </View>
        <TouchableOpacity className="ml-3 p-4  bg-white rounded-full">
          <Ionicons name="options-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Grid List */}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-3xl mb-5 w-[47%] overflow-hidden shadow-sm">
            <View className="h-36 bg-gray-200 rounded-t-3xl" />
            <View className="p-3 flex-row items-center justify-between">
              <Text className="text-black font-semibold">{item.name}, {item.age}</Text>
              <Ionicons name="heart-outline" size={20} color="#444" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
