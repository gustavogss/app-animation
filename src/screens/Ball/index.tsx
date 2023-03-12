import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Paint,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { styles } from "./styles";
import {View, TouchableOpacity, Text} from 'react-native';

const COLOR = "#664AFF";

export function Ball() {
  const blur = useValue(0);
  const circleRadiusOne = useValue(60);
  const circleRadiusTwo = useValue(40);
  const circleRadiusThree = useValue(20);

  return (
    <View style={{flex:1}}>
    <Canvas style={styles.container}>
      <Group opacity={0.8}>
      <Circle cx={100} cy={100} r={circleRadiusOne} color={COLOR}>
        <BlurMask blur={blur} style={"normal"} />
      </Circle>
      <Circle cx={100} cy={100} r={circleRadiusTwo} color={COLOR}>
        <BlurMask blur={blur} style={"normal"} />
      </Circle>
      </Group>
      <Circle cx={100} cy={100} r={circleRadiusThree} color={COLOR}>
        <BlurMask blur={blur} style={"normal"} />
        <Paint style={"stroke"} strokeWidth={10} color="white" opacity={0.5} />
      </Circle>
    </Canvas>    
    </View>
  );
}
