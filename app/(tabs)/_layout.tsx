import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBarIcon from "../../component/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "tomato",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home-sharp" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarActiveTintColor: "tomato",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "settings-sharp" : "settings-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
