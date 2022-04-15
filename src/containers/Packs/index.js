import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    Footer,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import axios from 'axios';


export default function Packs({ navigation, route }) {
    const [packs, setPacks] = useState([]);
    const [isLoading,setIsLoading] = useState(true)

    const getPackages = async (text) => {
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/packages');
            console.log({ packs: response?.data })
            setPacks(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPackages()
    }, [])

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
                <View style={{
                    borderBottomLeftRadius: Metrics.ratio(30),
                    borderBottomRightRadius: Metrics.ratio(30),
                    overflow: 'hidden',
                    height: Metrics.screenHeight * 0.3,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Image style={{

                        height: Metrics.screenHeight * 0.3,
                    }}
                        source={require('../../assets/images/packs.png')}
                        resizeMode='cover'
                    />
                </View>


                <View style={{ marginBottom: Metrics.screenHeight * 0.05 }}>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(15),
                        }}
                        fontSize={Metrics.ratio(24)}
                        color='#000'
                        fontWeight='bold'
                        title={'Buy Vote'}
                    />


                </View>
                <ScrollView>
                    <View style={{ width: Metrics.screenWidth * 0.8, alignSelf: 'center', marginVertical: Metrics.ratio(40) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            {packs?.map((item, index) => {
                                return <View style={{
                                    height: Metrics.screenHeight * 0.17,
                                    width: Metrics.screenWidth * 0.35,
                                    backgroundColor: '#fff',
                                    elevation: 5,
                                    borderRadius: Metrics.ratio(15),
                                    alignItems: 'center',
                                    marginTop: index > 1 ? Metrics.ratio(40) : 0,
                                }}>
                                    <View style={{
                                        height: Metrics.screenHeight * 0.1,
                                        width: Metrics.screenWidth * 0.2,
                                        backgroundColor: '#CC2D3A',
                                        elevation: 5,
                                        borderRadius: Metrics.ratio(15),
                                        marginTop: -Metrics.ratio(25),
                                        justifyContent: 'center'
                                    }}>
                                        <CustomText
                                            style={{
                                                width: Metrics.screenWidth * 0.11,
                                                alignSelf: 'center',
                                                textAlign: 'center',
                                            }}
                                            fontSize={Metrics.ratio(16)}
                                            color='rgba(255, 255, 255, 1)'
                                            fontWeight='bold'
                                            title={`${item?.votes} Votes`}
                                        />
                                    </View>
                                    <CustomText
                                        style={{
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            marginTop: Metrics.ratio(10),
                                        }}
                                        fontSize={Metrics.ratio(20)}
                                        color='rgba(23, 43, 77, 1)'
                                        fontWeight='normal'
                                        title={`${item?.price} USD`}
                                    />
                                    <CustomText
                                        style={{
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            marginTop: Metrics.ratio(5),
                                        }}
                                        fontSize={Metrics.ratio(8)}
                                        color='rgba(122, 134, 154, 1)'
                                        fontWeight='normal'
                                        title={'Buy vote and you may win crash prizes'}
                                    />
                                    <TouchableOpacity onPress={() => navigation.navigate('PaymentMethod', { packId: item?.id, packPrice: item?.price })}>
                                        <CustomText
                                            style={{
                                                alignSelf: 'center',
                                                textAlign: 'center',
                                                marginTop: Metrics.ratio(5),
                                            }}
                                            fontSize={Metrics.ratio(12)}
                                            color='rgba(254, 196, 45, 1)'
                                            fontWeight='normal'
                                            title={'CLICK TO BUY'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            })}
                        </View>
                    </View>

                </ScrollView>

                <Image style={{

                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.6,
                    alignSelf: 'center',
                    marginTop: Metrics.ratio(10)
                }}
                    source={require('../../assets/images/logo.png')}
                    resizeMode='stretch'
                />
            </View>
        </Footer>
    )
}
