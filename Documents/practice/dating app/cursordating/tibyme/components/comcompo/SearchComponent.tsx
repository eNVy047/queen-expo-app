// File: components/SearchComponent.tsx
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

export const SearchComponent = ({ profiles, onSelect }: { profiles: any[], onSelect: (profile: any) => void }) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = profiles.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="relative">
      <TouchableOpacity 
        onPress={() => setShowDropdown(!showDropdown)}
        className="p-2"
      >
        <Search />
      </TouchableOpacity>
      {showDropdown && (
        <View className="absolute top-10 w-64 bg-white p-2 rounded-lg shadow-xl z-50">
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            className="border border-gray-300 rounded px-2 py-1 mb-2"
          />
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => { onSelect(item); setShowDropdown(false); }}
                className="p-2 active:bg-gray-100"
              >
                <Text className="text-gray-800">
                  {item.name}, {item.age} - {item.distance}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};