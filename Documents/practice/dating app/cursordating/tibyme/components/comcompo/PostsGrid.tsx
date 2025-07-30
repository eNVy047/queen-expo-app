import React from 'react';
import { FlatList, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';

interface Post {
  id: string | number;
  image: string;
}

interface PostsGridProps {
  posts: Post[];
  loading: boolean;
  onPostPress: (post: Post) => void;
  header?: React.ReactElement;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, loading, onPostPress, header }) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPostPress(item)}
          className="w-1/3 aspect-square p-0.5"
        >
          <Image
            source={{ uri: item.image }}
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

export default PostsGrid;
