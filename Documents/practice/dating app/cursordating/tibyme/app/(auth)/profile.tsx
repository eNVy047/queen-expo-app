import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '@/components/comcompo/InputField';
import CustomButton from '@/components/comcompo/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { logoImage } from '@/constants';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authAPI } from '@/scripts/api';

export default function ProfileDetailsScreen() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState({
    username:'',
    firstName: '',
    lastName: '',
    birthDate: new Date(1995, 6, 11),
  });

  // 🎯 Image picker function
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  // 📆 Handle date change
  const onDateChange = (_event: unknown, selectedDate?: Date) => {
    if (selectedDate) {
      setShowDatePicker(Platform.OS === 'ios');
      setForm({ ...form, birthDate: selectedDate });
    }
  };

  // 📅 Format date for display
  const formatDate = (date: Date): string =>
    `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()}`;

  // 🚀 Submit Profile to Backend
  const SubmitProfile = async () => {
  if (
    !form.username ||
    !form.firstName ||
    !form.lastName ||
    !form.birthDate ||
    !avatar
  ) {
    Alert.alert('Missing Info', 'All fields including profile picture are required.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('dateOfBirth', form.birthDate.toISOString().split('T')[0]); // ✅ Required format

    const filename = avatar.split('/').pop() ?? 'avatar.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const fileType = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append('avatar', {
      uri: avatar,
      name: filename,
      type: fileType,
    } as any); // React Native FormData workaround

    const response = await authAPI.addProfile(formData);

    if (response.status === 200 || response.status === 201) {
      router.replace('/userdetails');
    } else {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  } catch (error: any) {
    console.error("Profile submission error:", error); // ✅ View in Metro logs

  if (error.response) {
    Alert.alert('Error', error.response.data?.message || 'Something went wrong on the server.');
  } else {
    Alert.alert('Error', 'No server response received.');
  }
  }
};


  return (
    <View className="flex-1 bg-white px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white">
        <View className="flex-1">
          <Image
            source={logoImage.logo}
            className="w-[100px] h-[90px]"
            resizeMode="contain"
          />
        </View>

       <TouchableOpacity
            className="flex-row items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 active:bg-gray-100"
            activeOpacity={0.7}
            onPress={async () => {
              try {
                const response = await authAPI.logout(); // ✅ Add parentheses to call the function
                if (response.status === 200 || response.status === 201) {
                  router.replace("/(auth)/sign-in");
                } else {
                  alert("Logout failed. Please try again.");
                }
              } catch (error) {
                console.error('Logout error:', error);
                alert("An error occurred during logout.");
              }
            }}
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text className="text-red-500 font-JakartaMedium ml-2 text-sm">
              Logout
            </Text>
          </TouchableOpacity>

      </View>

      {/* Avatar Upload */}
      <View className="items-center mb-4">
        <TouchableOpacity onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} className="w-24 h-24 rounded-full" />
          ) : (
            <View className="w-24 h-24 bg-gray-300 rounded-full items-center justify-center">
              <Text className="text-gray-600">Upload</Text>
            </View>
          )}
        </TouchableOpacity>
        {!avatar && (
          <Text className="text-red-500 text-xs text-center mt-1">
            Profile picture is required
          </Text>
        )}
      </View>

       {/* user Name */}
      <InputField
        label="Username"
        placeholder="Enter unique username"
        value={form.username}
        onChangeText={(value) => setForm({ ...form, username: value })}
      />

      {/* First Name */}
      <InputField
        label="First Name"
        placeholder="Enter first name"
        value={form.firstName}
        onChangeText={(value) => setForm({ ...form, firstName: value })}
      />

      {/* Last Name */}
      <InputField
        label="Last Name"
        placeholder="Enter last name"
        value={form.lastName}
        onChangeText={(value) => setForm({ ...form, lastName: value })}
      />

      {/* Birthdate Picker */}
      <TouchableOpacity
        className="bg-purple-200 rounded-2xl py-3 mt-4 mb-4 items-center"
        onPress={() => setShowDatePicker(true)}
      >
        <Text className="text-purple-950 font-medium">
          {`Birthday: ${formatDate(form.birthDate)}`}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={form.birthDate}
          mode="date"
          display="spinner"
          onChange={onDateChange}
        />
      )}

      {/* Submit Button */}
      <View className="absolute bottom-[20px] left-0 right-0 px-6 pb-10 bg-white">
        <CustomButton
          title="Continue"
          onPress={SubmitProfile}
          className="mt-8"
        />
      </View>
    </View>
  );
}
