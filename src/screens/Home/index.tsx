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
  const rotation = useSharedValue(0);

  const onAnimatedStyle = useAnimatedStyle(()=>({
    transform: [
      {scale: onScale.value},
      {rotateZ: `${(rotation.value / Math.PI) * 180}deg`}
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

  const onRotation = Gesture
  .Rotation()
  .onUpdate((event)=>{
    rotation.value = event.rotation;
  })
  .onEnd(()=>{
    rotation.value = withTiming(0);
  })

  const onPitch = Gesture
  .Pinch()
  .onUpdate((event)=>{
    onScale.value = event.scale;
  })
  

function handlerZoom() {
  (onScale.value === 1) ? 
  (onScale.value = withTiming(1.5, {duration: 500, easing: Easing.elastic(3)})) 
  : 
  (onScale.value = withSpring(1));
  }


  return (
    <View style={styles.container}>
      <GestureDetector gesture={onPitch}>
      <Animated.View style={[styles.element, , onAnimatedStyle]} />
      </GestureDetector>
      <Button               
      title='Animar'  
      onPress={handlerZoom}    
      />
    </View>
  );
  }