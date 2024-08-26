import { View, Text, Image, Platform } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  const marginTopStyle = Platform.OS === "ios" ? { marginTop: 25 } : {};
  return (
    <View className="items-center justify-center gap-2 " style={marginTopStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-10 h-10 mb-[-18px]"
      />
      <Text
        className={`${focused ? "font-avbold" : "font-avregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <View className="flex-1 bg-[#F4EEE4]">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2B4735",
          tabBarInactiveTintColor: "#2B4735",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "rgba(252, 245, 242, 0.8)",
            height: 70,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="products"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.product} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="catalog"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.toner} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
