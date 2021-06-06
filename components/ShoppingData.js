import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Card, CardActions, CardContent, CardMedia} from 'material-bread';
import {useDispatch} from 'react-redux';
import {ADD_TO_CART} from '../redux/actionTypes';

const ShoppingData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setData(response.data);
      })
      .catch(e => e.message);
  };

  const addItem = item => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };

  const lineSeparator = () => {
    return <View style={{borderWidth: 0.5, borderColor: 'gray'}}></View>;
  };

  return (
    <View>
      <FlatList
        style={{top: 0}}
        data={data}
        ItemSeparatorComponent={lineSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index}>
            <Card
              onPress={() =>
                navigation.navigate('Item', {
                  title: item.title,
                  image: item.image,
                  description: item.description,
                  price: item.price,
                  id: item.id,
                })
              }>
              <CardMedia
                image={
                  <Image
                    style={{flex: 1, width: '100%', top: 20}}
                    source={{uri: item.image}}
                    resizeMode="contain"
                  />
                }
              />
              <CardContent>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.price}>{`${item.price} ₹`}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    top: 10,
                  }}>
                  <Button title="Add to cart" onPress={() => addItem(item)} />
                  <Button
                    onPress={() =>
                      navigation.navigate('Check', {buyNow: addItem(item)})
                    }
                    title="Buy Now"
                  />
                </View>
              </CardContent>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingData;

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
