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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar, Appbar} from 'react-native-paper';

const {height, width} = Dimensions.get('window');
const MainScreen = () => {
  const navigation = useNavigation();

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
    <>
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
      </DrawerLayoutAndroid>
    </>
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
