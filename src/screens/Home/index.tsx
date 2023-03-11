import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
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
  const position = useSharedValue(0);

  const onAnimatedStyle = useAnimatedStyle(()=>({
    transform: [
      {scale: onScale.value},
      {rotateZ: `${(rotation.value / Math.PI) * 180}deg`},
      {translateX: position.value},
      
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

  const onDragDrop = Gesture
  .Pan()
  .onUpdate((event)=>{
    position.value = event.translationX;
  })
  .onUpdate((event)=>{
    position.value = event.translationY;
  })
  .onEnd(()=>{
    position.value = withTiming(0);
  })
  

function handlerZoom() {
  (onScale.value === 1) ? 
  (onScale.value = withTiming(1.5, {duration: 500, easing: Easing.elastic(3)})) 
  : 
  (onScale.value = withSpring(1));
  }


  return (
    <View style={styles.container}>
      <GestureDetector gesture={onDragDrop}>
      <Animated.View style={[styles.element, , onAnimatedStyle]} />
      </GestureDetector>
      <TouchableOpacity      
      style={styles.botao}
      onPress={handlerZoom}    
      >
        <Text style={styles.btnText}>Animar</Text>
      </TouchableOpacity>
    </View>
  );
  }