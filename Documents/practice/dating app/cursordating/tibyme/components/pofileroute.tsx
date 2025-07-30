import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProfileTabs from '@/components/comcompo/ProfileTabs';
import PostsGrid from '@/components/comcompo/PostsGrid';
import ReelsGrid from '@/components/comcompo/ReelsGrid';
import TaggedGrid from '@/components/comcompo/TaggedGrid';

type TabOption = 'posts' | 'reels' | 'tagged';

interface ProfileRouteProps {
  userId: string;
}

const ProfileRoute: React.FC<ProfileRouteProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<TabOption>('posts');
  const [posts, setPosts] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [taggedPosts, setTaggedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    posts: false,
    reels: false,
    tagged: false,
  });

  useEffect(() => {
    if (activeTab === 'posts' && posts.length === 0) fetchPosts();
    else if (activeTab === 'reels' && reels.length === 0) fetchReels();
    else if (activeTab === 'tagged' && taggedPosts.length === 0) fetchTaggedPosts();
  }, [activeTab]);

  const fetchPosts = async () => {
    setLoading((prev) => ({ ...prev, posts: true }));
    try {
      const mockPosts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        image: `https://picsum.photos/id/${i + 10}/300/300`,
      }));
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading((prev) => ({ ...prev, posts: false }));
    }
  };

  const fetchReels = async () => {
    setLoading((prev) => ({ ...prev, reels: true }));
    try {
      const mockReels = Array.from({ length: 8 }, (_, i) => ({
        id: i + 100,
        thumbnail: `https://picsum.photos/id/${i + 40}/300/500`,
        videoUrl: `https://example.com/reel-${i + 100}.mp4`,
      }));
      setReels(mockReels);
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading((prev) => ({ ...prev, reels: false }));
    }
  };

  const fetchTaggedPosts = async () => {
    setLoading((prev) => ({ ...prev, tagged: true }));
    try {
      const mockTagged = Array.from({ length: 6 }, (_, i) => ({
        id: i + 200,
        image: `https://picsum.photos/id/${i + 70}/300/300`,
      }));
      setTaggedPosts(mockTagged);
    } catch (error) {
      console.error('Error fetching tagged posts:', error);
    } finally {
      setLoading((prev) => ({ ...prev, tagged: false }));
    }
  };

  const handlePostPress = (post: any) => console.log('Post pressed:', post.id);
  const handleReelPress = (reel: any) => console.log('Reel pressed:', reel.id);
  const handleTaggedPress = (post: any) => console.log('Tagged post pressed:', post.id);

  const header = (
    <View className="px-4 py-2 bg-[#F0ECF9]">
      {/* <Text className="text-gray-800 text-sm mb-2">User ID: {userId}</Text> */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );

  return (
    <View className="flex-1 bg-[#F0ECF9]">
      {activeTab === 'posts' && (
        <PostsGrid
          posts={posts}
          loading={loading.posts}
          onPostPress={handlePostPress}
          header={header}
        />
      )}
      {activeTab === 'reels' && (
        <ReelsGrid
          reels={reels}
          loading={loading.reels}
          onReelPress={handleReelPress}
          header={header}
        />
      )}
      {activeTab === 'tagged' && (
        <TaggedGrid
          taggedPosts={taggedPosts}
          loading={loading.tagged}
          onTaggedPress={handleTaggedPress}
          header={header}
        />
      )}
    </View>
  );
};

export default ProfileRoute;
