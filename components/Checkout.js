import React from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SwipeButton from 'rn-swipe-button';
import {useSelector, useDispatch} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {EMPTY_CART} from '../redux/actionTypes';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const Checkout = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const CartItems = useSelector(state => state.basket);
  const Total = useSelector(state => state.total);
  const title = useSelector(state => state.title);
  const image = useSelector(state => state.image);

  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART,
    });
  };

  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'white',
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
        <View style={{borderWidth: 0.3, borderStyle: 'dashed'}}></View>
        <View style={{height: height / 2.5, position: 'relative'}}>
          <View>
            {CartItems ? (
              <View>
                <FlatList
                  data={CartItems}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <>
                      <View key={index} style={{flexDirection: 'row'}}>
                        <Text>{`${index + 1}.`} </Text>
                        <Text
                          numberOfLines={1.5}
                          style={{fontSize: 15, fontWeight: 'bold'}}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContents: 'center',
                        }}>
                        <Text
                          style={{
                            right: 10,
                            alignSelf: 'flex-end',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>{`${item.price} ₹`}</Text>
                      </View>
                    </>
                  )}
                />
              </View>
            ) : (
              <View>
                <FlatList
                  data={route.params.buyNow}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <>
                      <View key={index} style={{flexDirection: 'row'}}>
                        <Text>{`${index + 1}.`} </Text>
                        <Text
                          numberOfLines={1.5}
                          style={{fontSize: 15, fontWeight: 'bold'}}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContents: 'center',
                        }}>
                        <Text
                          style={{
                            right: 10,
                            alignSelf: 'flex-end',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>{`${item.price} ₹`}</Text>
                      </View>
                    </>
                  )}
                />
              </View>
            )}
          </View>

          <View style={{borderWidth: 0.3, borderStyle: 'dashed'}}></View>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 5,
              }}>
              <Text
                style={
                  (styles.textStyle, {color: 'black'})
                }>{`Price (${CartItems.length} item)`}</Text>
              <Text
                style={
                  (styles.textStyle, {color: 'black', fontWeight: 'bold'})
                }>
                {`${Total} ₹`}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 5,
              }}>
              <Text style={styles.textStyle}>Discount</Text>
              <Text
                style={
                  (styles.textStyle, {color: 'black', fontWeight: 'bold'})
                }>
                --
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                top: 5,
              }}>
              <Text style={styles.textStyle}>Delivery Charges</Text>
              <Text
                style={
                  (styles.textStyle, {color: 'black', fontWeight: 'bold'})
                }>
                FREE
              </Text>
            </View>
            <View style={{borderWidth: 0.2, color: 'gray', top: 10}}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 10,
              }}>
              <Text style={styles.textStyle}>Total Amount</Text>
              <Text
                style={
                  (styles.textStyle, {color: 'black', fontWeight: 'bold'})
                }>
                {`${Total} ₹`}
              </Text>
            </View>

            <View
              style={{
                top: 45,
                borderStyle: 'dashed',
              }}>
              <Text style={{fontSize: 19, color: 'gray', bottom: 3}}>
                SHIPPING ADDRESS
              </Text>
              <View style={{borderWidth: 0.3, borderStyle: 'dashed'}}></View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 100,
                  top: 10,
                }}>
                <Text style={styles.textStyle}>Address</Text>
              </View>
            </View>
          </View>
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
          title="Swipe to checkout"
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
          titleStyles={{fontStyle: 'italic'}}
          onSwipeSuccess={() => {
            var options = {
              description: `${title}`,
              image: `${image}`,
              currency: 'INR',
              key: 'rzp_test_7z3UCs7ZWbQvTq',
              amount: `${Total}`,
              name: 'Checkout',
              external: {
                wallets: ['paytm'],
              },
              prefill: {
                email: 'Shopping@outlook.com',
                contact: '97893920291',
                name: 'Satyajeet',
              },
              theme: {color: '#6c5ce7'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                alert(`Success: ${data.razorpay_payment_id}`);
                emptyCart();
                navigation.replace('Main');
              })
              .catch(error => {
                alert(`Error: ${error.code} | ${error.description}`);
              });
            RazorpayCheckout.onExternalWalletSelection(data => {
              alert(`External Wallet Selected: ${data.external_wallet} `);
            });
          }}
        />
      </Animatable.View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: 'black',
  },
});
