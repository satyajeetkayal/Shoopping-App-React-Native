import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Card, CardActions, CardContent, CardMedia} from 'material-bread';

const ShoppingData = () => {
  const navigation = useNavigation();
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
  return (
    <View>
      <FlatList
        style={{top: 0}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index}>
            <Card>
              <CardActions rightActionItems={[{name: 'share'}]}></CardActions>

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
                <Button title="Add to cart" />
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
