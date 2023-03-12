import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Square } from '../screens/Square';
import { Ball } from '../screens/Ball';

const Stack = createStackNavigator();

export function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Square" component={Square} options={{title: 'Square'}}/>
                <Stack.Screen name="Ball" component={Ball} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}