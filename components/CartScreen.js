import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {Card, CardContent, CardMedia} from 'material-bread';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';
import {REMOVE_FROM_CART} from '../redux/actionTypes';

const CartScreen = ({route}) => {
  const itemCount = useSelector(state => state.basket);
  const itemTotal = useSelector(state => state.total);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
      headerTitleAlign: 'center',
      headerStyle: {backgroundColor: '#81ecec'},
    });
  }, []);

  const discardItem = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  const lineSeparator = () => {
    return (
      <View
        style={{borderWidth: 0.5, borderColor: 'gray', elevation: 20}}></View>
    );
  };

  return (
    <>
      <View>
        {itemCount.length !== 0 ? (
          <FlatList
            data={itemCount}
            ItemSeparatorComponent={lineSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{top: 5, flex: 1}} key={index}>
                <Card style={{height: Dimensions.get('window').height / 3.6}}>
                  <CardMedia
                    image={
                      <Image
                        style={{
                          flex: 1,
                          width: '20%',
                          justifyContent: 'flex-start',
                          flexDirection: 'column',
                          right: 150,
                        }}
                        source={{uri: item.image}}
                        resizeMode="contain"
                      />
                    }
                  />
                  <CardContent
                    style={{
                      flexDirection: 'column',
                      position: 'relative',
                      marginLeft: 70,
                      bottom: 130,
                      width: Dimensions.get('window').width / 1.1,
                    }}>
                    <Text numberOfLines={2} style={{fontSize: 20}}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        top: 10,
                        fontWeight: 'bold',
                      }}>{`${item.price} ₹`}</Text>
                  </CardContent>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      bottom: 130,
                    }}>
                    <Button onPress={() => discardItem(item)}>Remove</Button>
                    <Button>Save for later</Button>
                  </View>
                </Card>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 30,
            }}></Text>
        )}
      </View>
      <>
        {itemCount.length !== 0 && (
          <Animatable.View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 2,
              bottom: 20,
              width: Dimensions.get('window').width / 1.1,
              height: 50,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              borderWidth: 0.5,
              elevation: 20,
            }}
            animation="fadeInUp"
            easing="ease">
            <View style={{flex: 2}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: '700',
                  fontSize: 20,
                }}>{`Total Amount  ${itemTotal} ₹`}</Text>
            </View>
            <Button onPress={() => navigation.navigate('Check')}>
              Checkout
            </Button>
          </Animatable.View>
        )}
        {itemCount.length == 0 && (
          <Animatable.View animation="fadeInDown" easing="ease">
            <View>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 30,
                }}>
                Your cart is empty.
              </Text>
              <Button
                onPress={() => navigation.navigate('Main')}
                style={{
                  width: 150,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                mode="outlined">
                Shop Now
              </Button>
            </View>
          </Animatable.View>
        )}
      </>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
