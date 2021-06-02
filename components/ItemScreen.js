import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';
import {useDispatch} from 'react-redux';
import {ADD_TO_CART} from '../redux/actionTypes';

const ItemScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <CartIcon />
        </View>
      ),
      headerStyle: {backgroundColor: '#81ecec', elevation: 20},
      headerTitle: '',
    });
  }, []);

  //const {id} = route.params;
  const {title} = route.params;
  const {price} = route.params;
  const {image} = route.params;

  const item = {title, price, image};

  const addCart = item => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };

  return (
    <>
      <StatusBar
        backgroundColor="#81ecec"
        barStyle="dark-content"
        animated={true}
      />
      <ScrollView style={{backgroundColor: 'white', bottom: 5}}>
        <View style={{top: 10}}>
          <Image
            source={{uri: route.params.image}}
            style={{
              width: '100%',
              aspectRatio: 1.5,
              resizeMode: 'contain',
              backgroundColor: 'white',
            }}
          />
        </View>
        <View style={{backgroundColor: 'white', top: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 23, letterSpacing: 1}}>
            {route.params.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 23, fontWeight: 'bold', top: 10}}>
              {`${route.params.price} ₹`}
            </Text>
            <Text
              style={{
                top: 20,
                fontWeight: 'bold',
                color: 'gray',
                fontStyle: 'italic',
              }}>
              {' '}
              FREE delivery
            </Text>
          </View>
          <Text
            style={{color: 'gray', fontSize: 15, fontStyle: 'italic', top: 15}}>
            Description
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1.5,
              top: 15,
            }}>
            {route.params.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            top: 40,
          }}>
          <Button
            style={{height: 100}}
            mode="text"
            onPress={() =>
              navigation.navigate('Cart', {
                add: addCart(item),
              })
            }>
            ADD TO CART
          </Button>
          <Button
            mode="text"
            style={{height: 100}}
            onPress={() => alert('click')}>
            BUY NOW
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({});
