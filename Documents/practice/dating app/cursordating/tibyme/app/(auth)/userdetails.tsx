import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, TextInput, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@/components/comcompo/CustomButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { logoImage } from '@/constants';
import { ProfileFormProvider, useProfileForm } from '@/context/ProfileFormContext';
import { authAPI } from '@/scripts/api';

// --- Define Navigation Stack ---
type RootStackParamList = {
  Gender: undefined;
  Culture: undefined;
  Religion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- Shared Header Component ---
const ScreenHeader = () => (
 <View className="flex-row items-center justify-between pt-2 bg-white border-b border-gray-200 shadow-sm">
  <Image
    source={logoImage.logo}
    className="w-[150px] h-[90px]"
    resizeMode="contain"
  />
  <View className="items-end px-4">
    <Text className="text-xl font-JakartaSemiBold text-purple-800">Profile</Text>
  </View>
</View>
);

// --- Shared Option Button Component ---
const OptionButton = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-5 py-3 rounded-2xl mx-1 my-1 ${
      selected ? 'bg-purple-500 border-purple-800' : 'border-purple-300 bg-white'
    } border`}
    style={styles.shadowSm}
  >
    <Text className={`font-JakartaMedium text-base ${
      selected ? 'text-white' : 'text-purple-800'
    }`}>
      {label}
    </Text>
  </TouchableOpacity>
);

// --- Shared Footer Navigation ---
const NavigationFooter = ({
  onNext,
  onBack,
  step,
  totalSteps = 3,
}: {
  onNext: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}) => (
  <View className="px-6 pb-6 bg-white">
    {step && (
      <View className="mb-4">
        <View className="w-full bg-gray-200 rounded-full h-2">
          <View 
            className="bg-primary-500 h-2 rounded-full" 
            style={{ width: `${(step/totalSteps)*100}%` }}
          />
        </View>
        <Text className="text-gray-500 text-xs text-center mt-1">
          Step {step} of {totalSteps}
        </Text>
      </View>
    )}
    <View className='px-4 py-3 bg-purple-200 rounded-lg mb-10'>
    <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
      <Text className="text-yellow-800 text-sm text-center">
        ⚠️ Your account will be hidden until you unhide it! Don't worry, you can delete your account anytime.
      </Text>
    </View>
    <View className="flex-row justify-between gap-2">
      <TouchableOpacity
        onPress={onBack}
        className="flex-row items-center justify-center border border-white px-4 py-3 bg-purple-200 rounded-lg w-1/3"
      >
        <View className="p-2 rounded-full border border-white">
          <Ionicons name="arrow-back" size={20} color="#6B21A8" />
        </View>
        <Text className="text-gray-700 font-JakartaMedium ml-2">Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        className="flex-row items-center justify-center px-4 py-3 bg-purple-950 rounded-lg w-2/3"
      >
        <Text className="text-white font-JakartaMedium mr-2">
          {step === totalSteps ? "Finish" : "Next"}
        </Text>
        <View className="bg-white p-2 rounded-full shadow-md">
    <Ionicons name="arrow-forward" size={20} color="#6B21A8" />
  </View>
      </TouchableOpacity>
    </View>
    </View>
  </View>
);

// --- Screen 1: Gender ---
const GenderScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Gender'>> = ({ navigation }) => {
  const [gender, setGender] = useState('Female');
  const [lookingFor, setLookingFor] = useState('Male');
  const [goal, setGoal] = useState('Marriage');
 const { form, updateForm } = useProfileForm();


  return (
    <View className="flex-1 bg-gray-50">
      <ScreenHeader />
      <ScrollView className="px-6 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-xl font-JakartaBold text-gray-900 mb-6">Tell us about yourself</Text>
        
        <Text className="text-lg font-JakartaSemiBold text-gray-800 mb-3">I am</Text>
        <View className="flex-row flex-wrap mb-6 -mx-1">
          {['Female', 'Male','Others'].map(option => (
            <OptionButton 
              key={option} 
              label={option} 
              selected={gender === option} 
              onPress={() => setGender(option)} 
            />
          ))}
        </View>

        <Text className="text-lg font-JakartaSemiBold text-gray-800 mb-3">Looking for</Text>
        <View className="flex-row flex-wrap mb-6 -mx-1">
          {['Male', 'Female','Others'].map(option => (
            <OptionButton 
              key={option} 
              label={option} 
              selected={lookingFor === option} 
              onPress={() => setLookingFor(option)} 
            />
          ))}
        </View>

        <Text className="text-lg font-JakartaSemiBold text-gray-800 mb-3">My goal is</Text>
        <View className="flex-row flex-wrap -mx-1">
          {['Marriage', 'Dating','FriendShip','Make new Friends','Enjoy'].map(option => (
            <OptionButton 
              key={option} 
              label={option} 
              selected={goal === option} 
              onPress={() => setGoal(option)} 
            />
          ))}
        </View>
      </ScrollView>
      <NavigationFooter 
        onNext={() => {
          updateForm({ gender, lookingFor, goal });
          navigation.navigate('Culture')
        } }
        onBack={() => router.replace("/(auth)/profile")} 
        step={1}
      />
    </View>
  );
};

// --- Screen 2: Culture ---
const CultureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Culture'>> = ({ navigation }) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [culture, setCulture] = useState<string>('Turkish');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { form, updateForm } = useProfileForm();


  const cultures = [
    'Turkish',
    'Arabic',
    'Persian',
    'Western',
    'Indian',
    'East Asian',
    'African',
    'Latin American'
  ];

  const tags = [
    'Tea', 'Nasreddin Hodja', 'Closed wrestling', 
    'Bath', 'Dance', 'Kebab', 'Gym', 
    'Traveling', 'Music', 'Art', 'History',
    'Cuisine', 'Festivals', 'Traditional Clothing'
  ];

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(prev => prev.filter(i => i !== tag));
    } else {
      if (interests.length < 3) {
        setInterests(prev => [...prev, tag]);
      } else {
        Alert.alert('Limit reached', 'You can select up to 3 interests');
      }
    }
  };


  return (
    <View className="flex-1 bg-gray-50">
      <ScreenHeader />
      <ScrollView className="px-6 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-xl font-JakartaBold text-gray-900 mb-6">Cultural Preferences</Text>
        
        {/* Culture Dropdown */}
        <View className="mb-6">
          <Text className="text-base font-JakartaMedium text-gray-500 mb-2">Select your culture</Text>
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 border border-purple-300"
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-JakartaSemiBold text-gray-900">{culture}</Text>
              <Ionicons 
                name={showDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6B7280" 
              />
            </View>
          </TouchableOpacity>
          
          {showDropdown && (
            <View className="mt-1 bg-white rounded-lg border border-purple-200 shadow-sm">
              {cultures.map(item => (
                <TouchableOpacity
                  key={item}
                  className={`px-4 py-3 ${culture === item ? 'bg-primary-50' : ''}`}
                  onPress={() => {
                    setCulture(item);
                    setShowDropdown(false);
                  }}
                >
                  <Text className={`font-JakartaMedium ${culture === item ? 'text-primary-600' : 'text-gray-800'}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Interests Selection */}
        <Text className="text-lg font-JakartaSemiBold text-gray-800 mb-3">
          Select your interests (Max 3)
          {interests.length > 0 && (
            <Text className="text-sm font-JakartaMedium text-gray-500"> - {interests.length}/3 selected</Text>
          )}
        </Text>
        <View className="flex-row flex-wrap -mx-1 mb-4">
          {tags.map(tag => (
            <MultiOptionButton
              key={tag} 
              label={tag} 
              selected={interests.includes(tag)} 
              onPress={() => toggleInterest(tag)} 
              disabled={!interests.includes(tag) && interests.length >= 3}
            />
          ))}
        </View>
      </ScrollView>
      <NavigationFooter 
        onNext={() => {
          // Save to form state or API
           updateForm({ culture, interests });
          navigation.navigate('Religion');
        }} 
        onBack={() => navigation.goBack()} 
        step={2}
      />
    </View>
  );
};

// Update OptionButton to handle disabled state
const MultiOptionButton = ({
  label,
  selected,
  onPress,
  disabled = false
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`px-5 py-3 rounded-full mx-1 my-1 ${
      selected ? 'bg-purple-500 border-purple-500' : 
      disabled ? 'bg-white border-purple-200' : 'border-purple-300 bg-white'
    } border`}
    style={styles.shadowSm}
  >
    <Text className={`font-JakartaMedium text-base ${
      selected ? 'text-white' : 
      disabled ? 'text-purple-400' : 'text-purple-800'
    }`}>
      {label}
    </Text>
  </TouchableOpacity>
);


// --- Screen 3: Religion ---

const ReligionScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Religion'>> = ({ navigation }) => {
  const [nationality, setNationality] = useState<string>('Turk');
  const [religion, setReligion] = useState<string>('Islam');
  const [bio, setBio] = useState<string>('');
  const [showNationalityDropdown, setShowNationalityDropdown] = useState<boolean>(false);
  const [showReligionDropdown, setShowReligionDropdown] = useState<boolean>(false);
 const { form, updateForm } = useProfileForm();

  const nationalities = [
    'Indian', 'Turk', 'Arab', 'Persian', 'American', 'European', 
    'East Asian', 'African', 'South Asian', 'Southeast Asian',
    'Middle Eastern', 'Central Asian', 'Caribbean', 'Latin American',
    'Native American', 'Pacific Islander', 'Mixed', 'Other'
  ];

  const religions = [
    'Islam', 'Christianity', 'Judaism', 'Hinduism', 'Buddhism',
    'Sikhism', 'Jainism', 'Baháʼí', 'Shinto', 'Taoism', 'Zoroastrianism',
    'Atheism', 'Agnosticism', 'Spiritual', 'Other'
  ];

  const handleBioChange = (text: string) => {
    if (text.split(' ').filter(word => word.length > 0).length <= 50) {
      setBio(text);
    }
  };

  const DropdownItem = ({ 
    item, 
    selected, 
    onSelect 
  }: {
    item: string;
    selected: boolean;
    onSelect: () => void;
  }) => (
    <TouchableOpacity
      className={`px-4 py-3 ${selected ? 'bg-primary-50' : ''}`}
      onPress={onSelect}
    >
      <Text 
        className={`font-JakartaMedium ${selected ? 'text-primary-600' : 'text-gray-800'}`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item}
      </Text>
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-gray-50">
      <ScreenHeader />
      <ScrollView className="px-6 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-xl font-JakartaBold text-gray-900 mb-6">Personal Information</Text>
        
        {/* Nationality Dropdown */}
        <View className="mb-6">
          <Text className="text-base font-JakartaMedium text-gray-500 mb-2">Nationality</Text>
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 border border-gray-300"
            onPress={() => {
              setShowNationalityDropdown(!showNationalityDropdown);
              setShowReligionDropdown(false);
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text 
                className="text-lg font-JakartaSemiBold text-gray-900 flex-1 mr-2"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {nationality}
              </Text>
              <Ionicons 
                name={showNationalityDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6B7280" 
              />
            </View>
          </TouchableOpacity>
          
          {showNationalityDropdown && (
            <View className="mt-1 bg-white rounded-lg border border-gray-200 shadow-sm max-h-60">
              <FlatList
                data={nationalities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <DropdownItem
                    item={item}
                    selected={nationality === item}
                    onSelect={() => {
                      setNationality(item);
                      setShowNationalityDropdown(false);
                    }}
                  />
                )}
                nestedScrollEnabled
                initialNumToRender={10}
                windowSize={5}
              />
            </View>
          )}
        </View>

        {/* Religion Dropdown */}
        <View className="mb-6">
          <Text className="text-base font-JakartaMedium text-gray-500 mb-2">Religion</Text>
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 border border-gray-300"
            onPress={() => {
              setShowReligionDropdown(!showReligionDropdown);
              setShowNationalityDropdown(false);
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text 
                className="text-lg font-JakartaSemiBold text-gray-900 flex-1 mr-2"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {religion}
              </Text>
              <Ionicons 
                name={showReligionDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6B7280" 
              />
            </View>
          </TouchableOpacity>
          
          {showReligionDropdown && (
            <View className="mt-1 bg-white rounded-lg border border-gray-200 shadow-sm max-h-60">
              <FlatList
                data={religions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <DropdownItem
                    item={item}
                    selected={religion === item}
                    onSelect={() => {
                      setReligion(item);
                      setShowReligionDropdown(false);
                    }}
                  />
                )}
                nestedScrollEnabled
                initialNumToRender={10}
                windowSize={5}
              />
            </View>
          )}
        </View>

        {/* Bio Section */}
        <View className="mb-6">
          <Text className="text-base font-JakartaMedium text-gray-500 mb-2">Bio (Max 50 words)</Text>
          <TextInput
            className="bg-white rounded-xl p-4 border border-gray-300 h-32 text-gray-800 font-JakartaMedium"
            multiline
            numberOfLines={4}
            placeholder="Tell others about yourself..."
            value={bio}
            onChangeText={handleBioChange}
          />
          <Text className="text-right text-sm font-JakartaMedium text-gray-500 mt-1">
            {bio.split(' ').filter(word => word.length > 0).length}/50 words
          </Text>
        </View>
      </ScrollView>
      <NavigationFooter 
          onNext={async () => {
    updateForm({ nationality, religion, bio });

    try {
      const completeForm = { ...form, nationality, religion, bio };

      await authAPI.addUserDetails(completeForm); // Send all data at once
      router.push("/discover");
    } catch (err) {
      Alert.alert("Submission Error", "Failed to save profile.");
    }
  }} 
        onBack={() => navigation.goBack()} 
        step={3}
      />
    </View>
  );
};

// --- Exportable Profile Setup Stack ---
const ProfileSetup = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Gender" 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Culture" component={CultureScreen} />
      <Stack.Screen name="Religion" component={ReligionScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

const ProfileSetupWrapper = () => (
  <ProfileFormProvider>
    <ProfileSetup />
  </ProfileFormProvider>
);

export default ProfileSetupWrapper;