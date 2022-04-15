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

export default function Comments({ navigation, route }) {
    const { userData } = useSelector(state => state.root);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    console.log({ route })


    const getComments = async () => {
        try {
            const response = await axios.post(
                'https://arabiansuperstar.org/api/get_comments',
                { userid: route?.params?.userId },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log({ comments: response?.data })
            setComments(response?.data)
            setLoading(false)
        } catch (error) {
            console.log({ error })
            setLoading(false)
        }
    }

    const addComment = async () => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/add_comment',
                { userid: userData?.id, profile_id: route?.params?.userId, comment },
                { headers: { "Content-Type": "application/json" } });
            console.log({ res: response })
            getComments()
            setComment('')
            setLoading(false)
        } catch (error) {
            console.log({ error })
            setLoading(false)
        }
    }

    useEffect(() => {
        getComments()
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
                        <TouchableOpacity onPress={()=> navigation?.goBack()} style={{
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
                                    title={'COMMENTS'}
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
                        {comments?.map((item, index) => {
                            return <View style={{ flexDirection: 'row', paddingVertical: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(20) }}>
                                <Image style={{
                                    width: Metrics.ratio(35),
                                    height: Metrics.ratio(35),
                                    marginRight: Metrics.ratio(10),
                                    borderRadius: Metrics.ratio(55),
                                    overflow: 'hidden',
                                }}
                                    source={{ uri: `https://arabiansuperstar.org/public/${item?.user_comment?.social_profile_image}` }}
                                    resizeMode='contain'
                                />
                                <View>
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.8,
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(15)}
                                        color='#000'
                                        fontWeight='bold'
                                        title={item?.user_comment?.full_name}
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
                                        title={item?.comment}
                                    />
                                </View>


                            </View>
                        })}
                    </View>





                </ScrollView>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-evenly', elevation: 5, backgroundColor: '#fff', height: Metrics.ratio(75), width: Metrics.screenWidth, }}>
                    <TouchableOpacity onPress={() =>(setLoading(true), addComment())}>
                        <Icons.Ionicons name={'send'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(32)} style={{}} />
                        </TouchableOpacity>
                    <View style={{
                        height: Metrics.ratio(45),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#9A9EA4',
                        borderRadius: Metrics.ratio(23),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                    }}>
                        <TextInput
                            placeholder='Type a message....'
                            placeholderTextColor={'#7C8085'}
                            style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', paddingLeft: Metrics.ratio(15) }}
                            onChangeText={(text) => setComment(text)}
                            // onSubmitEditing={() =>(setLoading(true), addComment())}
                            value={comment}
                        />
                    </View>
                </View>
            </View>
        </Footer>
    )
}
