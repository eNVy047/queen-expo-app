import CustomButton from "@/components/comcompo/CustomButton";
import InputField from "@/components/comcompo/InputField";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { logoImage } from "@/constants/index";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode } from "react-native-country-picker-modal";
import { authAPI } from "@/scripts/api";
import { useAuth } from "@/context/AuthContext";


const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");

 const onSignUpPress = async () => {
    // Frontend validation
    if (!form.email || !form.phone || !form.password) {
      alert("All fields are required.");
      return;
    }
    // Basic phone format check
    if (!/^\+\d{10,15}$/.test(form.phone)) {
      alert("Please enter a valid phone number with country code (e.g., +919876543210).");
      return;
    }
    try {
      const payload = {
        email: form.email,
        phone: form.phone,
        password: form.password,
      };
      const response = await authAPI.register(payload);
      const type = response.data?.data?.type;
      if (response.status === 200 || response.status === 201) {
         router.replace({
                        pathname: "/(auth)/otp",
                        params: { phone: form.phone, type },
                      });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingBottom: 180 }}
            className="px-6"
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View className="items-center mt-10 mb-6">
              <Image
                source={logoImage.logo}
                className="w-[150px] h-[80px]"
                resizeMode="contain"
              />
            </View>

            {/* Header */}
            <View className="mb-6">
              <Text className="text-[28px] text-black font-JakartaSemiBold leading-[34px]">
                Create an Account
              </Text>
              <Text className="text-gray-500 font-JakartaRegular text-base mt-2">
                We'll send you a code to verify your phone or email.
              </Text>
            </View>

            {/* Email Input */}
            <InputField
              label="Email"
              placeholder="Enter your email"
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              className="pt-2"
            />

            {/* Phone Input with Country Code Picker */}
            <View className="mb-4">
              <Text className="text-base text-gray-700 mb-2 font-JakartaMedium">
                Phone Number
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl bg-white px-4 py-3">
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withCountryNameButton={false}
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                    const withoutCode = form.phone.replace(/^\+?\d{1,4}/, "");
                    setForm({ ...form, phone: `+${country.callingCode[0]}${withoutCode}` });
                  }}
                />
                <Text className="ml-2 text-base font-JakartaSemiBold text-gray-900">
                  +{callingCode}
                </Text>
                <TextInput
                  placeholder="1234567890"
                  keyboardType="phone-pad"
                  value={form.phone.replace(`+${callingCode}`, "")}
                  onChangeText={(value) =>
                    setForm({ ...form, phone: `+${callingCode}${value}` })
                  }
                  className="flex-1 ml-3 text-base text-black font-JakartaMedium"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Password */}
            <InputField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              className="pt-4"
            />
          </ScrollView>

          {/* Footer fixed at bottom */}
          <View className="absolute bottom-[20px] left-0 right-0 px-6 pb-10 bg-white">
            <CustomButton title="Sign Up" onPress={onSignUpPress} className="mb-4" />
            <View className="flex-row justify-center">
              <Text className="text-gray-600 font-JakartaRegular">
                Already have an account?{" "}
              </Text>
              <Link
                href="/sign-in"
                className="text-blue-600 font-JakartaSemiBold underline"
              >
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
