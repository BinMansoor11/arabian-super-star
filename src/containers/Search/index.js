import React, { useState, useEffect } from 'react'
import { View, TextInput, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux';
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import axios from 'axios';

export default function Search({ navigation, route }) {
    const { userData } = useSelector(state => state.root);
    const [comments, setComments] = useState([]);
    const [searches, setSearches] = useState([]);
    const [type, setType] = useState('');
    const [modalVisible, setModalVisible] = useState(false);



    const search = async (text) => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/search',
                { search: text , type },
                { headers: { "Content-Type": "application/json" } });
            console.log({ search: response })
            setSearches(response?.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        search('')
    }, [])

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5, backgroundColor: '#fff', height: Metrics.ratio(75), width: Metrics.screenWidth, }}>
                    <Icons.Feather name={'search'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(25)} style={{ marginLeft: Metrics.ratio(15) }} />
                    <View style={{
                        height: Metrics.ratio(45),
                        // borderWidth: Metrics.ratio(1),
                        // borderColor: '#9A9EA4',
                        // borderRadius: Metrics.ratio(23),
                        width: Metrics.screenWidth * 0.75,
                        alignSelf: 'center',
                    }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={'#7C8085'}
                            style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', paddingLeft: Metrics.ratio(15) }}
                            onChangeText={(text) => search(text)}
                        // value={comment}
                        />

                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icons.AntDesign name={'bars'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(25)} style={{ marginLeft: Metrics.ratio(0) }} />
                    </TouchableOpacity>
                </View>


                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        //   Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{
                            backgroundColor: '#fff',
                            height: Metrics.screenHeight * 0.3,
                            width: Metrics.screenWidth * 0.8,
                            borderRadius: Metrics.ratio(11),
                        }} >
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Icons.Entypo style={{ alignSelf: 'flex-end', marginTop: Metrics.ratio(10), marginHorizontal: Metrics.ratio(10) }} name={'cross'} color={'#000'} size={Metrics.ratio(20)} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'space-between', flex: 1, paddingBottom: Metrics.ratio(20), paddingLeft: Metrics.ratio(70) }}>

                                <CustomText
                                    style={{
                                        alignSelf: 'center', width: Metrics.screenWidth * 0.8,
                                    }}
                                    fontSize={Metrics.ratio(18)}
                                    color="#000"
                                    fontWeight='bold'
                                    title={'Search By :'}
                                />
                                <TouchableOpacity onPress={() => (setModalVisible(!modalVisible), setType('0'))}>

                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Full Name'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => (setModalVisible(!modalVisible), setType('1'))}>

                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Username'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => (setModalVisible(!modalVisible), setType('2'))}>

                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Email'}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => (setModalVisible(!modalVisible), setType('3'))}>


                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Nationality'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={{ backgroundColor: '#fff' }}>


                    <View style={{ width: '100%', justifyContent: 'center' }}>
                        {searches?.map((item, index) => {
                            return <TouchableOpacity  onPress={() => navigation.navigate('MyTabs', { profileId: item?.id })} style={{ flexDirection: 'row', paddingVertical: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(20), }}>
                                <Image style={{
                                    width: Metrics.ratio(55),
                                    height: Metrics.ratio(55),
                                    marginRight: Metrics.ratio(10),
                                    borderRadius: Metrics.ratio(150),
                                    overflow: 'hidden',
                                }}
                                    source={{ uri: `https://arabiansuperstar.org/public/${item?.social_profile_image}` }}
                                    resizeMode='contain'
                                />
                                <View style={{ height: Metrics.ratio(55), justifyContent: 'center', }}>
                                    <CustomText
                                        style={{
                                            width: Metrics.screenWidth * 0.8,
                                            // textAlign:'center',
                                        }}
                                        fontSize={Metrics.ratio(15)}
                                        color='#000'
                                        fontWeight='bold'
                                        title={item?.full_name}
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
                                        title={item?.username}
                                    />
                                </View>


                            </TouchableOpacity>
                        })}
                    </View>





                </ScrollView>

            </View>
        </Footer>
    )
}
