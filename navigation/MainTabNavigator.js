import React from "react";
import { Platform } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import WeighingScreen from "../screens/WeighingScreen";
import TimerScreen from "../screens/TimerScreen";

export default TabNavigator(
  {
    Weighing: {
      screen: WeighingScreen,
    },
    Timer: {
      screen: TimerScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (navigation.state.routeName) {
          case "Timer":
            return (
              <Ionicons
                name={"ios-stopwatch"}
                size={28}
                style={{ marginBottom: -3 }}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              />
            );
          case "Weighing":
            return (
              <MaterialCommunityIcons
                name="scale"
                size={28}
                style={{ marginBottom: -3 }}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              />
            );
        }
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
    },
  },
);
