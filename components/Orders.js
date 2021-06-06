import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const Orders = ({route}) => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.basket);

  return (
    <View>
      <FlatList />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
