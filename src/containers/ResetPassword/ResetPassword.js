import React,{useState} from 'react'
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
import axios from 'axios';


export default function ResetPassword({ navigation }) {

    // const [verificationCode, setVerificationCode] = useState(null);
    const [_email, setEmail] = useState('');


    const verifyEmail = async () => {
        // setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/send_varification_email', { email : _email }, { headers: { 'content-type': 'application/json' } });
            console.log({ verifyEmail: response?.data })
            // setIsLoading(false)
           if(response?.data?.status === 'error'){
            //   setVerificationCode(response?.data?.random_id)
              navigation.navigate('VerifyCode', {code: response?.data?.random_id, email:_email})
           }else {
            alert(response?.data?.msg)
           }
        } catch (error) {
            alert('Something went wrong')
            console.log({ error })
            // setIsLoading(false)  
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
             <TouchableOpacity
             onPress={()=> navigation.goBack()}
             
             style={{
                    marginTop: Metrics.screenHeight * 0.04,
                    marginBottom: Metrics.screenHeight * 0.01,
                    flexDirection: 'row', 
                    alignItems: 'center',
                    width: Metrics.screenWidth * 0.8,
                    alignSelf: 'center',
                }}>
                    <Icons.Feather name={'chevron-left'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(24)} style={{marginLeft: -Metrics.ratio(7)}} />
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
                        title={'Reset Password'}
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
                        title={'Enter your registered email'}
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
                         onChangeText={text => setEmail(text)}                    
                         value={_email}
                        
                        />
                    </View>

                </View>



                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>
                    <Button
                        onPress={() => _email === '' ? alert('Email is Required') : verifyEmail()}
                        height={Metrics.ratio(50)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='SEND'
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
