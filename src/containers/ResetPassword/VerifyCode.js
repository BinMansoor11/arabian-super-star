import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    Separator,
    CustomTextInput,
    VenueCard,
    Footer,
    CheckBox
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';




export default function VerifyCode({ navigation, route }) {

    const [verificationCode, setVerificationCode] = useState(null);


    const checkCode = () => {
    console.log({ route : route?.params?.code ,verificationCode})
        
        if (verificationCode == route?.params?.code) {
            navigation.navigate('NewPassword',{email:route?.params?.email})
        } else {
            alert('Invalid Code')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}

                style={{
                    marginTop: Metrics.screenHeight * 0.04,
                    marginBottom: Metrics.screenHeight * 0.01,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: Metrics.screenWidth * 0.8,
                    alignSelf: 'center',
                }}>
                <Icons.Feather name={'chevron-left'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(24)} style={{ marginLeft: -Metrics.ratio(7) }} />
                <CustomText
                    style={{
                        marginLeft: -Metrics.ratio(5),
                    }}
                    fontSize={Metrics.ratio(14)}
                    color='rgba(46, 46, 46, 0.7)'
                    fontWeight='bold'
                    title={'Back'}
                />

            </TouchableOpacity>
            <ScrollView>
                <View style={{ height: Metrics.screenHeight * 0.7 }}>
                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(30),
                        }}
                        fontSize={Metrics.ratio(23)}
                        color='#000'
                        fontWeight='bold'
                        title={'A verification code is sent to your email'}
                    />


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(50),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Enter code'}
                    />


                    <View style={{
                        height: Metrics.ratio(50),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput
                            style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width: Metrics.screenWidth * 0.8 }}
                            onChangeText={text => setVerificationCode(text)}
                            value={verificationCode}
                        />
                    </View>


                </View>

                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>

                    <Button
                        onPress={() => checkCode()}
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
