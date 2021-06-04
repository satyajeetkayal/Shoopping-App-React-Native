import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {auth} from '../firebase';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const RegisterUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
        });
        navigation.replace('Login');
      })
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
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          theme={{colors: {primary: '#f0c14b'}}}
          placeholder="Full Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          mode="outlined"
          theme={{colors: {primary: '#f0c14b'}}}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          theme={{colors: {primary: '#f0c14b'}}}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          onSubmitEditing={RegisterUser}
        />
        <Button
          onPress={RegisterUser}
          mode="contained"
          style={{marginTop: 10, padding: 5, borderRadius: 5}}
          color="#f0c14b">
          Create an account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    aspectRatio: 2,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
  },
  inputContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
});
