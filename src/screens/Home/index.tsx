import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import Animated, { useAnimatedStyle, useSharedValue }  from 'react-native-reanimated';

export function Home() {

  const scale = useSharedValue(2);
  const animatedStyle = useAnimatedStyle(()=>({
    transform: [
      {scale: scale.value}
    ]
  }));

function handlerAnimated() {
  (scale.value === 1) ? (scale.value = 1.5) : (scale.value = 1)  
  }


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.element, , animatedStyle]} />
      <Button       
      title='Animar'  
      onPress={handlerAnimated}    
      />
    </View>
  );
  }