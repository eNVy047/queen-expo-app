import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { authAPI } from "@/scripts/api";
import ProfileRoute from "@/components/pofileroute";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
}


export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        const currentUser = response?.data?.data;
        if (currentUser) {
          setUser(currentUser);
        } else {
          console.warn("⚠️ No user data found.");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchUser();
      }, []);
  
  // Mock data

  if (loading) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#6C47FF" />
          <Text className="mt-2 text-gray-500">Loading Profile...</Text>
        </View>
      );
    }

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
                        <Text className="text-center text-xl font-semibold text-black">{user?.username || "Profile"}</Text>
            
                        {/* Settings Button with Navigation */}
                        <TouchableOpacity 
                          className="absolute top-14 right-5 p-2 rounded-full active:bg-gray-200"
                          onPress={() => router.replace('/(root)/setting')}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="settings-outline" size={24} color="#000" />
                        </TouchableOpacity>
                      </View >

      {/* Profile Content */}
      <ScrollView className="pt-16 " nestedScrollEnabled={true}>
        {/* Profile Info Section */}
        <View className=" rounded-3xl p-5 items-center shadow-sm">

        {/* Profile Image + Camera Icon */}
        <View className="relative mb-3">
          <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
            className="w-20 h-20 rounded-full"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <Ionicons name="camera" size={14} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Name & Email */}
        <Text className="text-lg font-semibold text-black"><Text>{[user?.firstName, user?.lastName].filter(Boolean).join(' ')}</Text>
</Text>
        <Text className="text-sm text-gray-600">{user?.email}</Text>

        {/* Divider */}
        <View className="bg-white mt-5 w-full py-3 px-4 rounded-2xl flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-black">67%</Text>
            <Text className="text-xs text-gray-500">Reach</Text>
          </View>
          <View className="items-center flex-1 border-l border-r border-gray-300">
            <Text className="text-base font-bold text-black">3.4k</Text>
            <Text className="text-xs text-gray-500">Impression</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-black">2.8</Text>
            <Text className="text-xs text-gray-500">Credit</Text>
          </View>
        </View>
      </View>

        {/* Tabs */}
       <View>
         {user?._id && <ProfileRoute userId={user._id} />}
       </View>
      </ScrollView>
    </SafeAreaView>
  );
}