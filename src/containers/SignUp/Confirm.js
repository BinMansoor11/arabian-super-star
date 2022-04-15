import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';


export default function Confirm({ navigation, route }) {
    const dispatch = useDispatch();
    const { image_gallery, bio, video_path, hobbies, nominations, country_of_residence,
        nationality,
        gender,
        date_of_birth,
        zodiac, full_name,
        username,
        email,
        phone,
        password,
        social_name,
        social_email,
        social_profile_image,
        social_id,
        social_type,
    } = useSelector(state => state.root);
    const [isLoading, setIsLoading] = useState(false)

    var serializeForm = function (formData) {
        console.log({formData})
        var obj = {};
        for (var key of formData?._parts) {
            obj[key[0]] = key[1];
        }
        return obj;
    };

    const signUp = async () => {
        var bodyFormData = new FormData();

        bodyFormData.append('bio', bio)
        bodyFormData.append('video', video_path?.video)
        bodyFormData.append('hobbies', hobbies)
        bodyFormData.append('country', country_of_residence)
        bodyFormData.append('nationality', nationality)
        bodyFormData.append('social_avatar', social_profile_image !== '' ? social_profile_image : 'N/A')
        bodyFormData.append('social_name', social_name === '' ? 'N/A' : social_name)
        bodyFormData.append('social_email', social_email !== '' ? social_email : 'N/A')
        bodyFormData.append('social_id', social_id !== '' ? social_id : 'N/A')
        bodyFormData.append('social_type', social_type !== '' ? social_type : 'N/A')
        bodyFormData.append('profile', image_gallery[0]?.data)
        bodyFormData.append('fullname', full_name)
        bodyFormData.append('username', username)
        bodyFormData.append('email', email)
        bodyFormData.append('phone', phone)
        bodyFormData.append('password', password)
        bodyFormData.append('gender', gender === 0 ? 'Male' : 'Female')
        bodyFormData.append('d_o_b', date_of_birth)
        bodyFormData.append('zoidac', zodiac)
        bodyFormData.append('gellery', image_gallery)
        bodyFormData.append('selected_nominities',nominations)


        try {

            const response = await axios.post('https://arabiansuperstar.org/api/usercreate',
                serializeForm(bodyFormData),
                { headers: { "Content-Type": "application/json" } }
            );
            console.log(response)
            setIsLoading(false)
                dispatch({ type: 'isLoggedIn', payload: true })
                dispatch({ type: 'userData', payload: response?.data?.user })
            //     dispatch({ type: 'userId', payload: true })
            navigation.navigate('MyTabs')
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <View style={{
                borderBottomLeftRadius: Metrics.ratio(30),
                borderBottomRightRadius: Metrics.ratio(30),
                overflow: 'hidden',
                height: Metrics.screenHeight * 0.35,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000'
            }}>

                <Image style={{

                    height: Metrics.screenHeight * 0.3,
                }}
                    source={require('../../assets/images/login.png')}
                    resizeMode='contain'
                />
            </View>


            <View style={{
                marginBottom: Metrics.screenHeight * 0.05,
                alignItems: 'center'
            }}>

                <CustomText
                    style={{
                        // width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(50),

                    }}
                    fontSize={Metrics.ratio(24)}
                    color='#fff'
                    fontWeight='bold'
                    title={'Are you the one!'}
                />
                <View style={{
                    height: Metrics.screenHeight * 0.2,
                    width: Metrics.screenHeight * 0.2,
                    backgroundColor: '#fff',
                    marginTop: Metrics.ratio(20),
                    borderRadius: 999,
                    overflow: 'hidden',
                }}>
                    <Image source={{ uri: image_gallery[0]?.uri }} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
                </View>
            </View>
            <Button
                onPress={() => (signUp(),setIsLoading(true))}
                height={Metrics.ratio(40)}
                width={Metrics.screenWidth * 0.8}
                fontSize={Metrics.ratio(16)}
                title='LET’S GO'
                style={{ alignSelf: 'center', position: 'absolute', bottom: Metrics.ratio(50) }}
                radius={Metrics.ratio(10)}
            />

        </View>
    )
}
