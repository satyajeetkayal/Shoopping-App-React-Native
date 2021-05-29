import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from './components/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import MainScreen from './components/MainScreen';
import {BreadProvider} from 'material-bread';
import {Root} from 'native-base';
import ShoppingData from './components/ShoppingData';
import CartScreen from './components/CartScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Root>
      <BreadProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="Data"
              component={ShoppingData}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BreadProvider>
    </Root>
  );
}

const styles = StyleSheet.create({});
