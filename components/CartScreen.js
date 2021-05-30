import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card, CardContent, CardMedia} from 'material-bread';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';
import {REMOVE_FROM_CART} from '../redux/actionTypes';

const CartScreen = () => {
  const itemCount = useSelector(state => state.basket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
      headerTitleAlign: 'center',
    });
  }, []);

  const discardItem = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  return (
    <>
      <View>
        {itemCount.length !== 0 ? (
          <FlatList
            data={itemCount}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{top: 5}} key={index}>
                <Card onPress={() => alert('Does Nothing')}>
                  <CardMedia
                    image={
                      <Image
                        style={{flex: 1, width: '100%'}}
                        source={{uri: item.image}}
                        resizeMode="contain"
                      />
                    }
                  />
                  <CardContent>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{`${item.price} ₹`}</Text>
                    <Button mode="contained" onPress={() => discardItem(item)}>
                      Remove from Cart
                    </Button>
                  </CardContent>
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
            }}>
            Your Cart is Empty
          </Text>
        )}
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
