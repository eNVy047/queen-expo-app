import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

type TabOption = 'posts' | 'reels' | 'tagged';

interface ProfileTabsProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabOption[] = ['posts', 'reels', 'tagged'];

  return (
    <View className="flex-row justify-around border-b border-gray-200">
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => onTabChange(tab)} className="p-2">
          <Text className={`text-sm ${activeTab === tab ? 'text-black font-bold' : 'text-gray-500'}`}>
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileTabs;
