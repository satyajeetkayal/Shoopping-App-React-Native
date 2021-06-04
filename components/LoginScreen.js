import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Image,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUser = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => navigation.replace('Main'))
      .catch(e => alert(e.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
        }}
      />
      <View style={styles.loginContainer}>
        <TextInput
          mode="outlined"
          theme={{
            colors: {primary: '#f0c14b', underlineColor: 'transparent'},
          }}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          theme={{
            colors: {primary: '#f0c14b', underlineColor: 'transparent'},
          }}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signUser}
        />
        <Button
          color="#f0c14b"
          mode="contained"
          onPress={signUser}
          style={{marginTop: 10, padding: 5}}>
          Sign in
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    aspectRatio: 2,
  },
  loginContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
});
