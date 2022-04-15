import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
    Footer,
    CheckBox
} from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import axios from 'axios';

export default function Notifications({ navigation, route }) {
    const { userData } = useSelector(state => state.root);
    const [notifications, setNotifications] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    console.log({ route })


    const getNotifications = async () => {
        try {
            const response = await axios.post(
                'https://arabiansuperstar.org/api/notifications',
                { userid: JSON.parse(userData?.id) },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log({ notifications: response })
            setNotifications(response?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log({ error })
        }
    }

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={{ elevation: 5, backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={() => navigation?.goBack()} style={{
                            // marginTop: Metrics.screenHeight * 0.04,
                            // marginBottom: Metrics.screenHeight * 0.01,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: Metrics.screenWidth * 0.9,
                            alignSelf: 'center',
                            paddingVertical: Metrics.screenHeight * 0.01,
                        }}><View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                                <Icons.Feather name={'chevron-left'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(32)} style={{ marginLeft: -Metrics.ratio(7) }} />
                                <CustomText
                                    style={{
                                        marginLeft: -Metrics.ratio(5),
                                    }}
                                    fontSize={Metrics.ratio(14)}
                                    color='rgba(46, 46, 46, 0.7)'
                                    fontWeight='bold'
                                    title={'NOTIFICATIONS'}
                                /></View>
                            <Image style={{
                                height: Metrics.ratio(45),
                                width: Metrics.ratio(45),
                                borderRadius: Metrics.ratio(55),
                                overflow: 'hidden',
                            }}
                                source={{ uri: route?.params?.profilePic }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>


                    </View>

                    <View style={{ width: '100%', }}>
                        {notifications?.map((item, index) => {
                            return <View style={{ flexDirection: 'row', paddingVertical: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(20) }}>
                                <Icons.MaterialIcons name={'circle-notifications'} color={'#CC2D3A'} size={Metrics.ratio(32)} style={{ marginHorizontal: Metrics.ratio(10) }} />

                                <View>
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.8,
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(15)}
                                        color='#000'
                                        fontWeight='bold'
                                        title={item?.data?.subject}
                                    />
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.8,
                                            // marginTop: Metrics.ratio(5),
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(10)}
                                        color='rgba(24, 24, 24, 0.5)'
                                        fontWeight='normal'
                                        title={item?.message}
                                    />
                                </View>


                            </View>
                        })}
                    </View>





                </ScrollView>
            </View>
        </Footer>
    )
}
