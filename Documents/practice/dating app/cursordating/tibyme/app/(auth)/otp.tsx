import { ScrollView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import CustomButton from '@/components/comcompo/CustomButton'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { logoImage } from '@/constants'
import { Ionicons } from '@expo/vector-icons';
import { authAPI } from '@/scripts/api';
import { useAuth } from '@/context/AuthContext'; // Adjust path if needed

const OtpScreen = () => {
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [maskedPhone, setMaskedPhone] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const {   loginphone, register } = useAuth(); 
  
  // Get phone number from navigation params
  const { phone, type } = useLocalSearchParams();
  const phoneNumber = phone as string;

  useEffect(() => {
    if (phoneNumber) {
      // Mask the phone number for display (e.g., +91 98765XXXXX)
      const visibleDigits = 5;
      const masked = phoneNumber.slice(0, -visibleDigits) + 'XXXXX' + phoneNumber.slice(-2);
      setMaskedPhone(masked);
    } else {
      // Handle case where phone number isn't passed
      Alert.alert('Error', 'Phone number not found');
      router.back();
    }
  }, [phoneNumber]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/sign-in');
    }
  };

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  

const verifyOtp = async () => {
  const otpCode = otp.join('');

  if (otpCode.length !== 6) {
    Alert.alert('Invalid OTP', 'Please enter the complete 6-digit code');
    return;
  }

  setIsLoading(true);

  try {
    const payload = {
      phone: phoneNumber,
      otp: otpCode,
    };

    if (type === 'login') {
      // ✅ Use context loginphone function
      const result = await loginphone(payload.phone, payload.otp);

      if (result.success) {
        router.push('/(root)/(tabs)/discover');
      } else {
        Alert.alert('Verification Failed', result.error || 'Invalid OTP. Please try again.');
      }

    } else if (type === 'signup') {
      // ❗️ Signup flow still uses raw API call
      const otpResponse = await authAPI.verifyPhone(payload);

      if (otpResponse.status === 200 || otpResponse.status === 201) {
        router.replace('/(auth)/profile');
      } else {
        Alert.alert(
          'Verification Failed',
          otpResponse.data?.message || 'Invalid OTP. Please try again.'
        );
      }

    } else {
      Alert.alert('Error', 'Unexpected verification type.');
    }

  } catch (error: any) {
    Alert.alert('Error', 'An error occurred during verification. Please try again.');
    console.error('OTP Verification Error:', error);
  } finally {
    setIsLoading(false);
  }
};


  const handleResendOtp = async () => {
    setResendDisabled(true);
    setResendTimer(30);
    
    try {
      // Call resend OTP API with the phone number
      await authAPI.resendPhoneOTP(phoneNumber);
      
      // Start countdown timer
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      
      Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      setResendDisabled(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pb-10 bg-white">
          {/* Header with Back Button and Logo */}
          <View className="flex-row items-center justify-between mt-10 mb-6">
            <TouchableOpacity 
              onPress={handleBackPress}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            
            <Image
              source={logoImage.logo}
              className="w-[150px] h-[80px]"
              resizeMode="contain"
            />
            
            <View className="w-8" />
          </View>

          <View className="mt-10 mb-10">
            <Text className="text-3xl font-JakartaSemiBold text-gray-900 mb-2">
              Verify your number
            </Text>
            <Text className="text-gray-500 font-JakartaRegular">
              We've sent a 6-digit code to {maskedPhone || phoneNumber}
            </Text>
          </View>

          {/* OTP Boxes */}
          <View className="flex-row justify-between mb-8">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className="w-12 h-14 border border-gray-300 rounded-lg text-center text-xl font-JakartaSemiBold"
                keyboardType="number-pad"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
                selectionColor="#3b82f6"
              />
            ))}
          </View>

          <View className="absolute bottom-[20px] left-0 right-0 px-6 pb-10 bg-white">
            {/* Resend Code */}
            <View className="flex-row justify-center mb-10">
              <Text className="text-gray-500 font-JakartaRegular">
                Didn't receive code?{' '}
              </Text>
              {resendDisabled ? (
                <Text className="text-gray-500 font-JakartaRegular">
                  Resend in {resendTimer}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text className="text-blue-600 font-JakartaSemiBold">
                    Resend
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Submit Button */}
            <CustomButton
              title={isLoading ? "Verifying..." : "Verify & Continue"}
              onPress={verifyOtp}
              disabled={isLoading || otp.join('').length !== 6}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default OtpScreen