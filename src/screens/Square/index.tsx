import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Square() {
  const onScale = useSharedValue(2);
  const rotation = useSharedValue(0);
  const position = useSharedValue(0);
  const navigation = useNavigation();

  const onAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: onScale.value },
      { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
      { translateX: position.value },
    ],
  }));

  const onTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(Alert.alert)("Toque", "Você tocou no botão 2 vezes!");
    });

  const onLongPress = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      onScale.value = withTiming(1.5);
    })
    .onEnd(() => {
      onScale.value = withTiming(1);
    });

  const onRotation = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = event.rotation;
    })
    .onEnd(() => {
      rotation.value = withTiming(0);
    });

  const onPitch = Gesture.Pinch().onUpdate((event) => {
    onScale.value = event.scale;
  });

  const onDragDrop = Gesture.Pan()
    .onUpdate((event) => {
      position.value = event.translationX;
    })
    .onUpdate((event) => {
      position.value = event.translationY;
    })
    .onEnd(() => {
      position.value = withTiming(0);
    });

  function handlerZoom() {
    onScale.value === 1
      ? (onScale.value = withTiming(1.5, {
          duration: 500,
          easing: Easing.elastic(3),
        }))
      : (onScale.value = withSpring(1));
  }

  return (
    <View style={styles.container}>
      <GestureDetector
        gesture={Gesture.Race(
          onLongPress,
          onDragDrop,
          onPitch,
          onTap,
          onRotation
        )}
      >
        <Animated.View style={[styles.element, , onAnimatedStyle]} />
      </GestureDetector>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Ball')}
      >
        <Text style={styles.btnText}>Ball Animation</Text>
      </TouchableOpacity>
    </View>
  );
}

/*
 * Gesture.Race -> um gesto ignora o outro
 * Gesture.Simulation -> permite utlizar vários gestos ao mesmo tempo
 */
