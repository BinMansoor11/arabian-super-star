import React, { useState, useEffect } from 'react'
import { View, TextInput, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
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

export default function Search({ navigation, route }) {
    const { userData,nationality } = useSelector(state => state.root);
    const [gender, setGender] = useState(null);
    const [searches, setSearches] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [_nationality, setNationality] = useState(nationality === '' ? '' : nationality);
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [nationalities, setNationalities] = useState([]);

    const [isLoading, setIsLoading] = useState(false)


    const getCountries = async () => {
        // setIsLoading(true)
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/get_counties');
            setNationalities(response?.data)
            // setIsLoading(false)
        } catch (error) {
            console.log({ error })
            // setIsLoading(false)
        }
    }



    const search = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/search',
                { 
                    search: searchText, 
                    type,
                    country: _nationality,
                    gender : gender ? gender?.toLowerCase() : gender
                 },
                { headers: { "Content-Type": "application/json" } });
            console.log({ search: response })
            setModalVisible(!modalVisible)
            setSearches(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCountries()
        search()
    }, [])

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                    isLoading={true}
                    size="large"
                />}
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
                            onChangeText={(text) => setSearchText(text)}
                        // value={comment}
                        />

                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Icons.AntDesign name={'bars'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(25)} style={{ marginLeft: Metrics.ratio(0) }} />
                    </TouchableOpacity>
                </View>

                {modalVisible && <View style={{
                    borderRadius: 5,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    width: Metrics.screenWidth * 0.9,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                }}>
                    <>{['Full Name', 'User Name', 'Email', 'Nationality', 'Nominities', 'Gender'].map((item, index) => {
                        return <TouchableOpacity
                            onPress={() => index === 5 ? setGenderModalVisible(true) : setType(JSON.stringify(index))}
                            style={{ flexDirection: 'row', width: Metrics.screenWidth * 0.4, marginVertical: 10 }}>

                            {index !== 5 && <CheckBox
                                isSelected={JSON.stringify(index) === type ? true : false}
                                style={{ width: 20 }} />}
                            <CustomText
                                style={{}}
                                fontSize={Metrics.ratio(14)}
                                color='rgba(72, 77, 84, 1)'
                                fontWeight='normal'
                                title={item}
                            />

                            {index === 5 && <CustomText
                                style={{ marginLeft: Metrics.ratio(10) }}
                                fontSize={Metrics.ratio(14)}
                                color='rgba(72, 77, 84, 1)'
                                fontWeight='normal'
                                title={gender ? gender : 'Select'}
                            />}
                        </TouchableOpacity>
                    })}

                        <TouchableOpacity
                            onPress={() => setOptionModalVisible(true)} 
                            style={{
                                height: Metrics.ratio(40),
                                width: Metrics.screenWidth * 0.85,
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderWidth: Metrics.ratio(1),
                                borderColor: '#CC2D3A',
                                borderRadius: Metrics.ratio(11), marginBottom: Metrics.ratio(10)
                            }}
                        >
                            <CustomText
                                style={{
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    paddingLeft: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(16)}
                                color='#000'
                                fontWeight='normal'
                                title={_nationality !== '' ? _nationality : 'Select Country'}
                            />
                            <Icons.Ionicons name={'caret-down-sharp'} color={'#CC2D3A'} size={Metrics.ratio(20)} style={{ marginLeft: -Metrics.ratio(15) }} />
                        </TouchableOpacity>

                        <Button
                                                onPress={() => search()}
                                                height={Metrics.ratio(40)}
                                                width={Metrics.screenWidth * 0.85}
                                                fontSize={Metrics.ratio(15)}
                                                title={'GO'}
                                                style={{ 
                                                    alignSelf: 'center', marginBottom: Metrics.ratio(15), paddingHorizontal: Metrics.ratio(25) }}
                                                radius={Metrics.ratio(11)}
                                                // border={item?.seleced ? false : true}
                                                // disabled={item?.nominity_name === 'Arabian SuperStar' ? true : false}
                                            />
                    </>
                </View>}

                <Modal
                                            animationType="none"
                                            transparent={true}
                                            visible={optionModalVisible}
                                            onRequestClose={() => {
                                                setOptionModalVisible(!optionModalVisible);
                                            }}
                                        >
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                <View style={{
                                                    backgroundColor: '#fff',
                                                    height: Metrics.screenHeight * 0.7,
                                                    width: Metrics.screenWidth * 0.8,
                                                    borderRadius: Metrics.ratio(11),
                                                }} >
                                                    <ScrollView>
                                                        <View>
                                                            {nationalities?.map((item, index) => {
                                                                return <TouchableOpacity onPress={() => (setNationality(item?.title), setOptionModalVisible(!optionModalVisible))}>
                                                                    <CustomText
                                                                        style={{
                                                                            width: Metrics.screenWidth * 0.8,
                                                                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                                                                            marginVertical: Metrics.ratio(15),
                                                                            textAlign: 'center',
                                                                        }}
                                                                        fontSize={Metrics.ratio(16)}
                                                                        color='#000'
                                                                        fontWeight='normal'
                                                                        title={item?.title}
                                                                    />
                                                                </TouchableOpacity>
                                                            })}
                                                        </View>
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        </Modal>


                <Modal
                    animationType="none"
                    transparent={true}
                    visible={genderModalVisible}
                    onRequestClose={() => {
                        //   Alert.alert("Modal has been closed.");
                        setGenderModalVisible(!genderModalVisible);
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{
                            backgroundColor: '#fff',
                            height: Metrics.screenHeight * 0.2,
                            width: Metrics.screenWidth * 0.8,
                            borderRadius: Metrics.ratio(11),
                        }} >
                            <TouchableOpacity onPress={() => setGenderModalVisible(!genderModalVisible)}>
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
                                    title={'Select Gender:'}
                                />
                                <TouchableOpacity onPress={() => (setGenderModalVisible(!genderModalVisible), setGender('Male'))}>

                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Male'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => (setGenderModalVisible(!genderModalVisible), setGender('Female'))}>

                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='rgba(72, 77, 84, 1)'
                                        fontWeight='normal'
                                        title={'Female'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={{ backgroundColor: '#fff' }}>


                    <View style={{ width: '100%', justifyContent: 'center' }}>
                        {searches?.map((item, index) => {
                            return <TouchableOpacity onPress={() => navigation.navigate('MyTabs', { profileId: item?.id })} style={{ flexDirection: 'row', paddingVertical: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(20), }}>
                                <Image style={{
                                    width: Metrics.ratio(55),
                                    height: Metrics.ratio(55),
                                    marginRight: Metrics.ratio(10),
                                    borderRadius: Metrics.ratio(150),
                                    overflow: 'hidden',
                                }}
                                    source={{ uri: `https://arabiansuperstar.org/public/${item?.social_profile_image}` }}
                                    resizeMode='cover'
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
