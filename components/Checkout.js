import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SwipeButton from 'rn-swipe-button';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');
const Checkout = () => {
  const CartItems = useSelector(state => state.basket);
  return (
    <>
      <View
        style={{
          backgroundColor: 'White',
          height: 50,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Order Summary
        </Text>
      </View>
      <View style={{height: height / 2.5, position: 'relative'}}>
        <FlatList
          data={CartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <View key={index}>
                <Text>{`${index + 1}.`}</Text>
                <Text>{item.title}</Text>
                <Text>{`${item.price} ₹`}</Text>
              </View>
            </>
          )}
        />
        <View
          style={{
            top: 10,
            borderStyle: 'dashed',
            height: 30,
          }}>
          <Text style={{fontSize: 19, color: 'gray', bottom: 3}}>
            PRICE DETAILS
          </Text>
          <View style={{borderWidth: 0.3, borderStyle: 'dashed'}}></View>
          <Text>
            {`Price (${CartItems.length} item)`}
            <Text></Text>
          </Text>
          <Text style={{fontSize: 15}}>Total Quantity</Text>
          <Text>
            Discount <Text>-</Text>
          </Text>
          <Text style={{fontSize: 15}}>
            Delivery Charges <Text>FREE</Text>
          </Text>
          <View style={{borderWidth: 0.2, color: 'gray'}}></View>
          <Text>
            Total Amount <Text></Text>
          </Text>
          <View style={{borderWidth: 0.3, color: 'gray'}}></View>
        </View>
      </View>

      <Animatable.View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          position: 'absolute',
          zIndex: 2,
          bottom: 3,
          width: Dimensions.get('window').width - 5,
          height: 80,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.5,
          borderRadius: 5,
          elevation: 30,
        }}
        animation="fadeInUp"
        easing="ease"
        duration={700}
        delay={50}>
        <SwipeButton
          containerStyle={{elevation: 100}}
          title="Swipe to Checkout"
          height={60}
          screenReaderEnabled={true}
          width={width - 15}
          titleFontSize={20}
          titleColor="gray"
          swipeSuccessThreshold={105}
          shouldResetAfterSuccess={true}
          resetAfterSuccessAnimDelay={500}
          resetAfterSuccessAnimDuration={50}
          thumbIconBackgroundColor="white"
          thumbIconBorderColor="lightgray"
          railBackgroundColor="#ced6e0"
          railBorderColor="white"
          railFillBackgroundColor="#7bed9f"
          railFillBorderColor="#7bed9f"
          railStyles={{elevation: 30}}
        />
      </Animatable.View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
