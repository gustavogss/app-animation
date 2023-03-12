import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Square } from "../screens/Square";
import { Ball } from "../screens/Ball";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <View >      
      <Navigator>
        <Screen name="Square" component={Square} />
        <Screen name="Ball" component={Ball} />
      </Navigator>
    </View>
  );
}