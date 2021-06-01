import React, {useState, useRef, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  DrawerLayoutAndroid,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import Carousel from 'react-native-banner-carousel-updated';
import CartIcon from './CartIcon';
import ShoppingData from './ShoppingData';
import * as Animatable from 'react-native-animatable';

const {height, width} = Dimensions.get('window');
const bannerHeight = 210;
const images = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Gateway/Clearance_Store_25thMarch/Clearance-PC-1500x600._CB656852662_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/Feb/EN/1500x600_Hero-Tall_NP._CB658235929_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img21/1499store/2021/Feb/Hindi/Header_1500x600eng._CB660976519_.jpg',
];
const MainScreen = () => {
  const navigation = useNavigation();

  const renderImages = (image, index) => {
    return (
      <View key={index}>
        <Image
          style={{width: width, marginTop: 0.2, height: bannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{marginTop: 10}}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'transparent',
                aspectRatio: 1.7,
                resizeMode: 'center',
              }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {backgroundColor: '#81ecec'},
      headerLeft: () => (
        <View style={{margin: 5, marginLeft: 10}}>
          <Icon
            name="menu"
            size={25}
            onPress={() => drawer.current.openDrawer()}
          />
        </View>
      ),
      headerRight: () => <CartIcon />,
    });
  }, []);

  const drawer = useRef(null);
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Image
        style={{height: 100, width: 100, aspectRatio: 2, resizeMode: 'contain'}}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
        }}
      />
    </View>
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
      style={{
        flex: 1,
        zIndex: +1,
        position: 'relative',
        height: height,
      }}>
      <ScrollView>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#81ecec',
          }}>
          <Searchbar
            placeholder="Search"
            clearIcon="close"
            icon="camera"
            iconColor="black"
            style={{
              height: 40,
              borderRadius: 5,
              width: width,
              elevation: 10,
            }}
          />
        </View>
        <View
          style={{
            width: width,
            height: 30,
            backgroundColor: '#00cec9',
            flexDirection: 'row',
          }}>
          <Icon
            name="location-outline"
            size={15}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginLeft: 5,
            }}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 4,
            }}>
            {' '}
            Deliver to User - India 324008
          </Text>
        </View>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={width}
          showsPageIndicator={true}
          pageIndicatorStyle={{backgroundColor: 'white'}}>
          {images.map((image, index) => renderImages(image, index))}
        </Carousel>
        <ShoppingData />
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  navigationContainer: {
    backgroundColor: '#fff',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
