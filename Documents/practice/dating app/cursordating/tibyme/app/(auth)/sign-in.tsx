import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image
} from "react-native";
import CountryPicker, {
  CountryCode,
} from "react-native-country-picker-modal";

import CustomButton from "@/components/comcompo/CustomButton";
import InputField from "@/components/comcompo/InputField";
import { logoImage } from "@/constants";
import { authAPI } from "@/scripts/api";
import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [form, setForm] = useState({
    phone: "",
    email: "",
    password: "",
  });
  const {   loginemail, setToken, setUser, setIsAuthenticated } = useAuth(); 
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");

  const onSignInPress = async () => {
    if (method === "phone") {
      if(!form.phone){
        alert("Enter phone number..");
        return;
      }
      if (!/^\+\d{10,15}$/.test(form.phone)) {
      alert("Please enter a valid phone number with country code (e.g., +919876543210).");
      return;
    }
    try {
      const payload = {
        phone: form.phone,
      };
      const response = await authAPI.login(payload);
      const type = response.data?.data?.type;
            if (response.status === 200 || response.status === 201) {
              router.replace({
                pathname: "/(auth)/otp",
                params: { phone: form.phone, type },
              });
              
            } else {
              alert("Login failed. Please try again.");
            }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed. Please try again.");
    }
    } else {
      if (!form.email  || !form.password) {
      alert("All fields are required.");
      return;
     }
     try {
      const result = await  loginemail(form.email, form.password);

      if (result.success) {
        router.replace("/(root)/(tabs)/discover"); // ✅ Redirect after login
      } else {
        alert(result.error || "Login failed. Please try again.");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed. Please try again.");
    }
    }
  };

  
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mt-10">
              <Image
                source={logoImage.logo}
                className="w-[150px] h-[80px] mb-6"
                resizeMode="contain"
              />
            </View>
        <View className="flex-1 px-6 pb-10">
          {/* Header */}
          <View className="relative w-full  justify-end mb-6">
            <Text className="text-3xl text-black font-JakartaSemiBold mb-4">
              Login Account 👋
            </Text>
          </View>

          {/* Toggle Buttons */}
          <View className="flex-row justify-between mb-6">
            <CustomButton
              title="Sign In with Phone"
              onPress={() => setMethod("phone")}
              className={`flex-1 mr-2 ${
                method === "phone" ? "bg-primary-500" : "bg-purple-300"
              }`}
            />
            <CustomButton
              title="Sign In with Email"
              onPress={() => setMethod("email")}
              className={`flex-1 ml-2 ${
                method === "email" ? "bg-primary-500" : "bg-purple-300"
              }`}
            />
          </View>

          {/* Conditional Form */}
          {method === "phone" ? (
            <View className="mb-4">
              <Text className="text-sm text-gray-500 mb-2 font-medium">
                Phone Number
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl bg-white px-4 py-3">
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withCallingCode
                  withFlag
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                    const withoutCode = form.phone.replace(/^\+?\d{1,4}/, "");
                    setForm({
                      ...form,
                      phone: `+${country.callingCode[0]}${withoutCode}`,
                    });
                  }}
                />
                <Text className="ml-2 text-base font-semibold">+{callingCode}</Text>
                <TextInput
                  placeholder="1234567890"
                  keyboardType="phone-pad"
                  value={form.phone.replace(`+${callingCode}`, "")}
                  onChangeText={(value) =>
                    setForm({
                      ...form,
                      phone: `+${callingCode}${value}`,
                    })
                  }
                  className="flex-1 ml-3 text-base text-black font-semibold"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          ) : (
            <>
              <InputField
                label="Email"
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
            </>
          )}

          <View className="absolute bottom-[20px] left-0 right-0 px-6 pb-10 bg-white">
            {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600 font-JakartaRegular">
              Don't have an account?{" "}
            </Text>
            <Link
              href="/sign-up"
              className="text-blue-600 font-JakartaSemiBold underline"
            >
              Sign Up
            </Link>
          </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
