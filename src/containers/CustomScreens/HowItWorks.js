import React from 'react'
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


const array = ['Arabian Superstar', 'Popular Choice', 'Fashion Style Icon', 'Pure Talent', 'The Gentleman', 'Pageant King']


export default function ResetPassword({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
             <TouchableOpacity style={{
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



                <View style={{ height: Metrics.screenHeight * 0.8 }}>
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
                        <TextInput />
                    </View>

                </View>



                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>
                    <Button
                        onPress={() => navigation.navigate('VerifyCode')}
                        height={Metrics.ratio(50)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='SEND'
                        style={{ position: 'absolute', bottom: Metrics.ratio(40), alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(90) }}
                        radius={Metrics.ratio(11)}
                    />





                    <Image style={{

                        // height: Metrics.screenHeight * 0.05,
                        width: Metrics.screenWidth * 0.6,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}
                        source={require('../../assets/images/logo.png')}
                        resizeMode='contain'
                    />
                </View>
            </ScrollView>
        </View>
    )
}
