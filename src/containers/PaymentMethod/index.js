import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet } from 'react-native'
import {
  Header,
  Button,
  CustomText,
  Separator,
  CustomTextInput,
  VenueCard,
  Footer,
  CheckBox,
  ActivityIndicator
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { CreditCardInput } from "react-native-credit-card-input";


export default function PaymentMethod({ navigation, route }) {

  const packId = route?.params?.packId;
  const packPrice = route?.params?.packPrice;

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('');
  const [cardType, setCardType] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const CURRENCY = 'USD';
  var CARD_TOKEN = null;

  const _onChange = (formData) => {
    console.log({ formData })
    setCardNumber(formData?.values?.number);
    setCardName(formData?.values?.name);
    setCardExpiry(formData?.values?.expiry);
    setCardCvc(formData?.values?.cvc);
    // setCardZip(formData?.values?.zip);
  }


  const charges = async () => {
    console.log("CARD_TOKEN", CARD_TOKEN)
    const card = {
      'amount': JSON.parse(packPrice) * 100,
      'currency': CURRENCY,
      'source': CARD_TOKEN,
      'description': `Campaign bought for id ${packId}`
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${'sk_test_51IDyaaJIdBLwz6OiBYrcb0bmgPDbfH8Ya7fYzRY2PPfZRNqWpwSJ2qAM5FSzEeQ0bGBUF6vUXb5Hrvb0g9hvwufB00tFsc8UtI'}`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json())
      .then(val => {
        console.log(`val in charges`, val)
        return val
      })
      .catch(err => {
        console.log(`err in charges`, err)
        // ref.current.alertWithType('error', 'Error', 'Error')
      });
  };


  function subscribeUser(creditCardToken) {
    return new Promise((resolve) => {
      console.log('Credit card token\n', creditCardToken);
      CARD_TOKEN = creditCardToken.id;
      setTimeout(() => {
        resolve({ status: true });
      }, 1000);
    });
  };


  async function getCreditCardToken(creditCardData) {
    console.log(`creditCardDatax`, creditCardData)
    // alert()
    const card = {
      'card[number]': creditCardData?.values?.number?.replace(/ /g, ''),
      'card[exp_month]': creditCardData?.values?.expiry?.split('/')[0],
      'card[exp_year]': creditCardData?.values?.expiry?.split('/')[1],
      'card[cvc]': creditCardData?.values?.cvc
    };
    try {
      const response = await fetch('https://api.stripe.com/v1/tokens', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${'pk_test_51IDyaaJIdBLwz6Oishd5TxYiZZ6mi2mU9mcKI40BZj0TfFxusk01S3LgxqhDvhifBBAj5wfW0N2mE2mAiBxjCiP900yfTQ6XhG'}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  };


  const onSubmit = async (data) => {

    // if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
    //   // alert('Invalid Credit Card');
    //   ref.current.alertWithType('error', 'Error', 'Invalid Credit Card.')
    //   setLoading(false)
    //   return false;
    // }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(data);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        // alert("creditCardToken error");
        console.log(`creditCardToken.error`, creditCardToken.error)
        if (creditCardToken.error.code === "incorrect_number") {
          // ref.current.alertWithType('error', 'Error', "Your Card Number is Incorrect.")
          console.log("Your Card Number is Incorrect.")
          setIsLoading(false)
        } else {
          // ref.current.alertWithType('error', 'Error', creditCardToken.error.message)
          console.log(creditCardToken.error.message)
        }

        setIsLoading(false)
        return;
      }
    } catch (e) {
      console.log("e", e);
      // ref.current.alertWithType('error', 'Error', "No Internet Connection Available.")
      setIsLoading(false)
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      // alert(error)
      console.log(error)
      // ref.current.alertWithType('error', 'Error', error)
      setIsLoading(false)
    } else {

      let payment_data = await charges();
      console.log('payment_data', payment_data);
      if (payment_data.status === 'succeeded') {
        // have to comment after build
        // setModal(true);
        // removeItem('promo_code')
        // dispatch(updateCart([]))
        setIsLoading(false)
        alert('Payment Successful')

      }
      else {
        // alert('Payment failed');
        // ref.current.alertWithType('error', 'Error', 'Payment Failed.')
        setIsLoading(false)
      }
    }
  };




  const handleErrors = () => {
    if (cardNumber !== '', cardName !== '', cardCvc !== '') {
      setIsLoading(true);

      // setIsLoading(false)

      onSubmit({
        "values": {
          "number": cardNumber,
          "expiry": cardExpiry,
          "cvc": cardCvc,
          "type": "visa"
        },
        "valid": true,
      })
    } else {
      setIsLoading(false)
      alert('Please fill all the fields')
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {isLoading && <ActivityIndicator
        isLoading={true}
        size="large"
      />}
      <ScrollView>
        <View style={{ height: Metrics.screenHeight * 0.8 }}>
          <View style={{ marginTop: Metrics.ratio(50), marginHorizontal: Metrics.ratio(20) }}>
            <CreditCardInput
              // autoFocus

              requiresName
              requiresCVC
              // requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              //   onFocus={this._onFocus}
              onChange={_onChange}
            />
          </View>
        </View>

        <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>
          <Button
            onPress={() => (handleErrors())}
            height={Metrics.ratio(50)}
            width={Metrics.screenWidth * 0.8}
            fontSize={Metrics.ratio(15)}
            title='NEXT'
            style={{ position: 'absolute', bottom: Metrics.ratio(40), alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(90) }}
            radius={Metrics.ratio(11)}
          />
          <Image style={{

            height: Metrics.screenHeight * 0.07,
            width: Metrics.screenWidth * 0.6,
            alignSelf: 'center',
            marginTop: Metrics.ratio(10),
          }}
            source={require('../../assets/images/logo.png')}
            resizeMode='stretch'
          />
        </View>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});