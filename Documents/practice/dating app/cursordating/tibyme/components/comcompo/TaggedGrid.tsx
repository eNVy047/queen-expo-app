import React from 'react';
import { FlatList, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

interface TaggedGridProps {
  taggedPosts: any[];
  loading: boolean;
  onTaggedPress: (post: any) => void;
  header?: React.ReactElement;
}

const TaggedGrid: React.FC<TaggedGridProps> = ({ taggedPosts, loading, onTaggedPress, header }) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={taggedPosts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onTaggedPress(item)} className="w-1/3 aspect-square p-0.5">
          <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
        </TouchableOpacity>
      )}
      ListHeaderComponent={header}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TaggedGrid;
