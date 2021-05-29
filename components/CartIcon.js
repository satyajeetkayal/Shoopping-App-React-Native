import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CartIcon = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={{color: 'black', fontWeight: 'bold', top: 5}}>0</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.5}>
        <Icon
          name="ios-cart"
          color="black"
          size={30}
          style={{marginBottom: 10}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({});
