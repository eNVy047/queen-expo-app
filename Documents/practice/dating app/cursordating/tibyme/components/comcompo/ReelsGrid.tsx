import React from 'react';
import { FlatList, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

interface ReelsGridProps {
  reels: any[];
  loading: boolean;
  onReelPress: (reel: any) => void;
  header?: React.ReactElement;
}

const ReelsGrid: React.FC<ReelsGridProps> = ({ reels, loading, onReelPress, header }) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={reels}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onReelPress(item)} className="w-1/2 aspect-[13/16] p-0.5">
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      ListHeaderComponent={header}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ReelsGrid;
