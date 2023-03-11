import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { styles } from './styles';
import Animated, { 
  Easing,
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
  runOnJS
 }  
  from 'react-native-reanimated';

  import {GestureDetector, Gesture} from 'react-native-gesture-handler';

export function Home() {

  const scale = useSharedValue(2);
  const animatedStyle = useAnimatedStyle(()=>({
    transform: [
      {scale: scale.value}
    ]
  }));

  const onTap = Gesture
  .Tap()
  .numberOfTaps(2)
  .onStart(()=>{
    runOnJS(Alert.alert)('Toque', 'Você tocou no botão 2 vezes!')    
  });

function handlerZoom() {
  (scale.value === 1) ? 
  (scale.value = withTiming(1.5, {duration: 500, easing: Easing.elastic(3)})) 
  : 
  (scale.value = withSpring(1));
  }


  return (
    <View style={styles.container}>
      <GestureDetector gesture={onTap}>
      <Animated.View style={[styles.element, , animatedStyle]} />
      </GestureDetector>
      <Button               
      title='Animar'  
      onPress={handlerZoom}    
      />
    </View>
  );
  }