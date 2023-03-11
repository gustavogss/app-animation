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

  const onScale = useSharedValue(2);
  const onAnimatedStyle = useAnimatedStyle(()=>({
    transform: [
      {scale: onScale.value}
    ]
  }));

  const onTap = Gesture
  .Tap()
  .numberOfTaps(2)
  .onStart(()=>{
    runOnJS(Alert.alert)('Toque', 'Você tocou no botão 2 vezes!')    
  });

  const onLongPress = Gesture
  .LongPress()
  .minDuration(200)
  .onStart(()=>{onScale.value = withTiming(1.5)})
  .onEnd(()=>{onScale.value = withTiming(1)    
  })
  

function handlerZoom() {
  (onScale.value === 1) ? 
  (onScale.value = withTiming(1.5, {duration: 500, easing: Easing.elastic(3)})) 
  : 
  (onScale.value = withSpring(1));
  }


  return (
    <View style={styles.container}>
      <GestureDetector gesture={onLongPress}>
      <Animated.View style={[styles.element, , onAnimatedStyle]} />
      </GestureDetector>
      <Button               
      title='Animar'  
      onPress={handlerZoom}    
      />
    </View>
  );
  }