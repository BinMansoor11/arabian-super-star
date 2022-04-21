import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
    Footer,
    CheckBox
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import axios from 'axios';


export default function Home({ navigation, route }) {
    const [users, setUsers] = useState([]);
    const [topContestants, setTopContestants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const getDiscoverData = async () => {
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/discover_page');
            console.log({ getDiscoverData: response?.data })
            setUsers(response?.data?.data?.users);
            setTopContestants(response?.data?.data?.winners);
            setIsLoading(false);
        } catch (error) {
            console.log({ error })
            setIsLoading(false);
        }
    }



    useEffect(() => {
        getDiscoverData()
    }, [])


    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
                {/* <ScrollView style={{ backgroundColor: '#fff' }}> */}


                    <View style={{ elevation: 5, backgroundColor: '#fff' }}>
                        <Image style={{
                            height: Metrics.screenHeight * 0.07,
                            width: Metrics.screenWidth * 0.6,
                            alignSelf: 'center',
                            // marginBottom: Metrics.ratio(10),
                            top: 0,
                        }}
                            source={require('../../assets/images/logo.png')}
                            resizeMode='stretch'
                        />
                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                // marginTop: Metrics.ratio(65),
                                textAlign: 'center',
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#4C4C4C'
                            fontWeight='bold'
                            title={'TOP CONTESTANT'}
                        />
                        <FlatList
                        data={topContestants}
                        renderItem={({ item }) => {
                            return<TouchableOpacity onPress={() => navigation.navigate('MyTabs', { profileId: item?.user?.id })} style={{ marginVertical: Metrics.ratio(15), alignItems: 'center' }}>
                            <View style={{
                                 width: Metrics.ratio(60),
                                 height:Metrics.ratio(60),
                            }}>
                                <Image style={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                    borderRadius: 999,
                                }}
                                    source={{ uri: `http://arabiansuperstar.org/public/${item?.user?.social_profile_image}` }}
                                    defaultSource={require('../../assets/images/placeholder.jpg')}
                                    resizeMode='cover'
                                />
                            </View>
                            <CustomText
                                style={{
                                    width: Metrics.screenWidth * 0.25,
                                    // alignSelf: 'center', 
                                    marginTop: Metrics.ratio(5),
                                    textAlign: 'center',
                                }}
                                fontSize={Metrics.ratio(9)}
                                color='#787C81'
                                fontWeight='normal'
                                title={item?.user?.full_name}
                            />
                        </TouchableOpacity>
                        }}
                        keyExtractor={item => item.id}
                        initialNumToRender={5}
                        horizontal={true}
                    />

                        {/* <ScrollView horizontal>
                            <View style={{ flexDirection: 'row' }}>
                                {topContestants?.map((item, index) => {
                                    return <TouchableOpacity onPress={() => navigation.navigate('MyTabs', { profileId: item?.id })} style={{ marginVertical: Metrics.ratio(15), alignItems: 'center' }}>
                                        <View style={{
                                             width: Metrics.ratio(60),
                                             height:Metrics.ratio(60),
                                        }}>
                                            <Image style={{
                                                width: '100%',
                                                height: '100%',
                                                overflow: 'hidden',
                                                borderRadius: 999,
                                            }}
                                                source={{ uri: `http://arabiansuperstar.org/public/${item?.user?.social_profile_image}` }}
                                                resizeMode='cover'
                                            />
                                        </View>
                                        <CustomText
                                            style={{
                                                width: Metrics.screenWidth * 0.25,
                                                // alignSelf: 'center', 
                                                marginTop: Metrics.ratio(5),
                                                textAlign: 'center',
                                            }}
                                            fontSize={Metrics.ratio(9)}
                                            color='#787C81'
                                            fontWeight='normal'
                                            title={item?.user?.full_name}
                                        />
                                    </TouchableOpacity>
                                })}
                            </View>
                        </ScrollView> */}

                    </View>


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.9,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(15),
                            // textAlign:'center',
                        }}
                        fontSize={Metrics.ratio(32)}
                        color='#000'
                        fontWeight='bold'
                        title={'Discover'}
                    />

                   
                    <FlatList
                        data={users}
                        renderItem={({ item }) => {
                            return <TouchableOpacity onPress={() => navigation.navigate('MyTabs', { profileId: item?.id })} style={{ alignSelf: 'center', width: Metrics.screenWidth * 0.9, height: Metrics.screenHeight * 0.5, backgroundColor: '#fff', elevation: 5, borderRadius: Metrics.ratio(11), marginVertical: Metrics.ratio(10) }}>
                            <View style={{ flexDirection: 'row', paddingVertical: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(20), alignItems:'center' }}>

                                <View style={{
                                    width: Metrics.ratio(45),
                                    height:Metrics.ratio(45),

                                    marginRight: Metrics.ratio(10),
                                }}>
                                    <Image style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: 999,
                                    }}
                                        source={{ uri: `https://arabiansuperstar.doodlenk.com/public/${item?.social_profile_image}` }}
                                        defaultSource={require('../../assets/images/placeholder.jpg')}
                                        resizeMode='cover'
                                    />
                                </View>
                                <View>
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.9,
                                            alignSelf: 'center',
                                            // marginTop: Metrics.ratio(15),
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(15)}
                                        color='#000'
                                        fontWeight='bold'
                                        title={item?.username}
                                    />
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.9,
                                            alignSelf: 'center',
                                            // marginTop: Metrics.ratio(5),
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(10)}
                                        color='rgba(24, 24, 24, 0.5)'
                                        fontWeight='normal'
                                        title={'Hace 20 min'}
                                    />
                                </View>

                            </View>
                            <Image style={{
                                width: Metrics.screenWidth * 0.8,
                                height: Metrics.screenHeight * 0.37,
                                alignSelf: 'center',
                                overflow: 'hidden',
                                borderRadius: 14,
                                // marginRight: Metrics.ratio(25),
                            }}
                                source={{ uri: `https://arabiansuperstar.doodlenk.com/public/${item?.geller_images[0]?.imagepath}/${item?.geller_images[0]?.image}` }}
                                defaultSource={require('../../assets/images/placeholder.jpg')}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                        }}
                        keyExtractor={item => item.id}
                        initialNumToRender={2}
                    />
                {/* </ScrollView> */}
            </View>
        </Footer>
    )
}
