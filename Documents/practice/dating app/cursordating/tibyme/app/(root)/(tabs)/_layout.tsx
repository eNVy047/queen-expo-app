import React from "react";
import { Tabs } from "expo-router";
import CustomNavBar from "../../../components/comcompo/CustomNavBar";

export default function _layout() {
  return (
    <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
      <Tabs.Screen name="discover" options={{title: "Discover", headerShown: false }} />
      <Tabs.Screen name="reel" options={{ title: "Reels", headerShown: false  }} />
      <Tabs.Screen name="likedyou" options={{ title: "Liked You", headerShown: false  }} />
      <Tabs.Screen name="chat" options={{ title: "Chat", headerShown: false  }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false  }} />
    </Tabs>
  );
}
