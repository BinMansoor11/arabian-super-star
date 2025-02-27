import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    Separator,
    CustomTextInput,
    VenueCard,
    Footer,
    CheckBox,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function FAQs({ navigation, route }) {
    const [isChecked, setIsChecked] = useState(false)
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
    const [faqs, setFaqs] = useState([])
    const [activeIndex, setActiveIndex] = useState(null)


    const getFAQs = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/faqs');
            

            setFaqs(response?.data?.data)

            console.log({ response: response?.data?.data})
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFAQs()
    }, [])
    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {isLoading && <ActivityIndicator
                    isLoading={true}
                    size="large"
                />}
                {/* <View style={{ marginBottom: Metrics.screenHeight * 0.02 }}>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(20),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='rgba(46, 46, 46, 0.7)'
                        fontWeight='bold'
                        title={'Back'}
                    />

                </View> */}
                <ScrollView>
                    <View style={{}}>
                        <View style={{ marginBottom: Metrics.screenHeight * 0.1, marginTop: Metrics.screenHeight * 0.03 }}>
                            <CustomText
                                style={{
                                    width: Metrics.screenWidth * 0.9,
                                    alignSelf: 'center',
                                    marginTop: Metrics.ratio(15),
                                }}
                                fontSize={Metrics.ratio(20)}
                                color={'#000'}
                                fontWeight='bold'
                                title='FAQs'
                            />

                            <CustomText
                                style={{
                                    width: Metrics.screenWidth * 0.9,
                                    alignSelf: 'center',
                                    marginTop: Metrics.ratio(30),
                                    marginBottom: Metrics.ratio(20),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color={'#000'}
                                fontWeight='bold'
                                title='Frequently Asked Questions'
                            />


                            <View>
                                {faqs?.length > 0 && faqs?.map((item, index) => {
                                    return <TouchableOpacity onPress={()=> setActiveIndex(index === activeIndex ? null : index)} style={{
                                        elevation:5, 
                                        borderRadius:5,
                                        backgroundColor:'white',
                                        width: Metrics.screenWidth * 0.9,
                                                alignSelf: 'center',
                                                marginBottom:Metrics.ratio(15),
                                                paddingVertical:Metrics.ratio(25),
                                                paddingHorizontal:Metrics.ratio(15),
                                                justifyContent:'center',
                                        }}>
                                        <CustomText
                                            style={{
                                                // width: Metrics.screenWidth * 0.8,
                                                // alignSelf: 'center',
                                                // marginTop: Metrics.ratio(30),
                                                marginBottom: activeIndex === index ?  Metrics.ratio(25) : 0,
                                            }}
                                            fontSize={Metrics.ratio(14)}
                                            color={index === activeIndex ? '#CC2D3A' : '#707070'}
                                            fontWeight='bold'
                                            title={item?.question}
                                        />
                                        {activeIndex === index  && <CustomText
                                            style={{
                                                // width: Metrics.screenWidth * 0.8,
                                                // alignSelf: 'center',
                                                // marginTop: Metrics.ratio(30),
                                                // marginBottom: Metrics.ratio(20),
                                            }}
                                            fontSize={Metrics.ratio(14)}
                                            color={'#9F9F9F'}
                                            fontWeight='normal'
                                            title={item?.answer}
                                        />}
                                    </TouchableOpacity>
                                })}
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={{backgroundColor:'white'}}>
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
            </View>
        </Footer>
    )
}
