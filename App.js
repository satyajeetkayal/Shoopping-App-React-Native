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
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/store';
import Checkout from './components/Checkout';
import LoginScreen from './components/LoginScreen';
import ItemScreen from './components/ItemScreen';
import RegisterScreen from './components/RegisterScreen';
import AccountScreen from './components/AccountScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Root>
      <BreadProvider>
        <StoreProvider store={store}>
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
              <Stack.Screen
                name="Check"
                component={Checkout}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Item" component={ItemScreen} />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </BreadProvider>
    </Root>
  );
}

const styles = StyleSheet.create({});
