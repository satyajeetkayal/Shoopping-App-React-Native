import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, StatusBar, LogBox} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase';
import {useDispatch} from 'react-redux';
import {SET_USER} from '../redux/actionTypes';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        navigation.replace('Main');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs([`Setting a timer`]);
    LogBox.ignoreLogs([`AsyncStorage`]);
    LogBox.ignoreLogs([`VirtualizedLists`]);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        style={styles.homeImage}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
        }}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginBottom: 10}} h4>
          Sign in to your account
        </Text>
        <Button
          color="#f0c14b"
          style={{
            borderRadius: 5,
            width: 350,
            height: 40,
            marginTop: 10,
          }}
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          Already a customer? Sign in
        </Button>
        <Button
          color="lightgray"
          style={{borderRadius: 5, width: 350, height: 40, marginTop: 10}}
          mode="contained"
          onPress={() => navigation.navigate('Register')}>
          New to Amazon? Create an account
        </Button>
        <Button
          color="lightgray"
          style={{borderRadius: 5, width: 350, height: 40, marginTop: 10}}
          mode="contained"
          onPress={() => navigation.navigate('Main')}>
          Skip sign in
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: -200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  homeImage: {
    height: 100,
    width: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    aspectRatio: 2,
  },
});
