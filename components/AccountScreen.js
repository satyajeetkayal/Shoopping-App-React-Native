import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ProgressBar, SheetBottom, List, ListItem, Card} from 'material-bread';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Toast} from 'native-base';
import {db} from '../firebase';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = ({route}) => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const onHide = () => setVisible(false);

  const cameraPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Popup',
            message: 'App needs camera permission',
            buttonNeutral: 'Ask me later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return setVisible(true);
        } else if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return Toast.show({
            text: 'Camera need access permission.',
          });
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const launchCamera = () => {
    let options = {
      title: 'Open Camera',
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 1,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        return (
          setVisible(false),
          Toast.show({
            text: 'Camera Access denied.',
          })
        );
      } else if (response.errorCode == 'camera_unavailable') {
        return (
          setVisible(false),
          Toast.show({
            text: 'Camera feature unavailable.',
          })
        );
      } else if (response.errorCode == 'permission') {
        return (
          setVisible(false),
          Toast.show({
            text: 'User Permission denied.',
          })
        );
      } else if (response.errorCode == 'others') {
        return (
          setVisible(false),
          Toast.show({
            text: `Camera Image Picker Error. ${response.errorMessage}`,
          })
        );
      } else {
        setImage(response.uri);
      }
    });
  };

  const selectImage = () => {
    let options = {
      title: 'Select Images',
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 1,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        return setVisible(false), Toast.show({text: 'Gallery access denied'});
      } else if (response.errorCode == 'camera_unavailable') {
        return (
          setVisible(false),
          Toast.show({
            text: 'Gallery feature unavailable.',
          })
        );
      } else if (response.errorCode == 'permission') {
        return (
          setVisible(false),
          Toast.show({
            text: 'User Permission denied.',
          })
        );
      } else if (response.errorCode == 'others') {
        return (
          setVisible(false),
          Toast.show({
            text: `Image Selection Error. ${response.errorMessage}`,
          })
        );
      } else {
        setImage(response.uri);
      }
    });
  };

  const changeAddress = async () => {
    await db
      .collection('Address')

      .collection('addressUsers')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        address: address,
        displayName: auth.currentUser.displayName,
      });

    setAddress('');
  };

  return (
    <View>
      <Image
        style={{
          height: Dimensions.get('window').height / 4,
          width: Dimensions.get('window').width,
          borderWidth: 0.5,
          top: 2,
          borderColor: 'black',
          aspectRatio: 2.5,
          resizeMode: 'cover',
        }}
        source={
          image
            ? {uri: image}
            : {
                uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
              }
        }
      />
      <TouchableOpacity
        style={{
          height: 30,
          width: 30,
          borderRadius: 50,
          backgroundColor: 'white',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          right: 5,
          top: 115,
          borderWidth: 0.5,
        }}
        activeOpacity={0.5}
        onPress={cameraPermission}>
        <Icon name="camera-outline" size={20} color="black" />
      </TouchableOpacity>
      <View
        style={{justifyContent: 'center', alignItems: 'center', bottom: 90}}>
        <Image
          source={
            image
              ? {uri: image}
              : {
                  uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                }
          }
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.iconStyle}
          activeOpacity={0.5}
          onPress={cameraPermission}>
          <Icon name="camera-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          mode="outlined"
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          onSubmitEditing={changeAddress}
        />
        <Button onPress={changeAddress}>change Address</Button>
      </View>

      <SheetBottom
        style={{bottom: 30}}
        visible={visible}
        onBackdropPress={onHide}
        onSwipeDown={onHide}>
        <List>
          <ListItem
            text={'Select Images from Gallery'}
            onPress={selectImage}
            icon={<Icon name="images" size={20} color="black" />}
          />
          <ListItem
            text={'Open camera'}
            onPress={launchCamera}
            icon={<Icon name="camera" size={20} color="black" />}
          />
        </List>
      </SheetBottom>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    width: 350,
    height: 50,
    top: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: 350,
    height: 40,
    borderRadius: 10,
    top: 0,
  },
  iconStyle: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 230,
    top: 110,
    borderWidth: 0.5,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    top: 40,
    right: 100,
    borderWidth: 0.5,
    borderColor: 'black',
  },
});
