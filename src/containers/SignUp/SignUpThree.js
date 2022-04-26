import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function SignUpThree({ navigation }) {
    const dispatch = useDispatch();
    const { hobbies, nominations, gender } = useSelector(state => state.root);

    const [_hobbies, setHobbies] = useState(hobbies === '' ? '' : hobbies);
    const [isLoading, setIsLoading] = useState(false)
    const [_nomins, setNomins] = useState([])


    const [_nominations, setNominations] = useState(nominations?.length === 0 ? [] : nominations);



    const setActive = (index) => {
        const duplicateArray = [..._nominations];
        duplicateArray[index].active = duplicateArray[index]?.active ? false : true
        console.log({ duplicateArray })
        setNominations(duplicateArray)
        setNomins(getActives())
    }

    const getActives = () => {
        const actives = _nominations.filter(item => item.active === true)
        const activeIds = actives.map(item => item.id)
        return activeIds
    }

    const getNomination = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/gender_nominites', { gender : gender === 0 ? 'Male' : 'Female'}, { headers: { 'content-type': 'application/json' } });
            console.log({ getNominations: response?.data })
            const arrayNomins = []
            for (const [key, value] of Object.entries(response?.data)) {
                console.log(value,key)
                value.active = ((key === '0' || key === '4') || value?.nominity_name === 'Arabian SuperStar') ? true : false
                arrayNomins.push(value)
            }
            // setNationalities(response?.data)
            setNominations(arrayNomins)

            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getNomination()

     }, [])

    const handleErrors = () => {
        if (_hobbies !== '') {
            //   return true;
            dispatch({ type: 'hobbies', payload: _hobbies })
            dispatch({ type: 'nominations', payload: _nomins })

            navigation.navigate('SignUpFour')
        } else {
            alert('Please fill all the fields')
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView>

                <View style={{ height: Metrics.screenHeight * 0.8 }}>
                    <TouchableOpacity
                        onPress={() => navigation?.goBack()}
                        style={{
                            marginTop: Metrics.screenHeight * 0.04,
                            marginBottom: Metrics.screenHeight * 0.01,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center',
                        }}>
                        <Icons.Feather name={'chevron-left'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(24)} style={{ marginLeft: -Metrics.ratio(7) }} />
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

                    <View style={{
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center', marginTop: Metrics.ratio(10),
                        marginTop: Metrics.ratio(50),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                        <CustomText
                            fontSize={Metrics.ratio(14)}
                            color='#000'
                            fontWeight='normal'
                            title={'Hobbies'}
                        />
                        <CustomText
                            style={{ marginLeft: Metrics.ratio(5) }}
                            fontSize={Metrics.ratio(11)}
                            color='rgba(46, 46, 46, 0.5)'
                            fontWeight='normal'
                            title={'(e.g, Football, Music, Reading, Dancing, etc.) Limit 50 characters'}
                        />
                    </View>
                    <View style={{
                        // height: Metrics.ratio(50),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput value={_hobbies} multiline={true} maxLength={50} onChangeText={(text) => setHobbies(text)} style={{ color: '#000', }} />
                    </View>


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginVertical: Metrics.ratio(15),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'You’re now nominated to be the Arabian Superstar enroll yourself for more titles!'}
                    />

                        <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }} >
                        {_nominations?.map((item, index) => {
                            return (
                                <Button
                                    onPress={() => setActive(index)}
                                    height={Metrics.ratio(50)}
                                    fontSize={Metrics.ratio(15)}
                                    title={item?.nominity_name}
                                    style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(10), paddingHorizontal: Metrics.ratio(25) }}
                                    radius={Metrics.ratio(11)}
                                    border={item?.active ? false : true}
                                    disabled = {item?.nominity_name === 'Arabian SuperStar' ? true : false}
                                />
                            )
                        })}

                            

                    </View>
</ScrollView>

                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1, height: Metrics.screenHeight * 0.2 }}>
                    <Button
                        onPress={() => handleErrors()}
                        height={Metrics.ratio(50)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='NEXT'
                        style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(20) }}
                        radius={Metrics.ratio(11)}
                    />




                    <View style={{
                        // flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <CustomText
                            // style={{ marginLeft: 10 }}
                            fontSize={Metrics.ratio(15)}
                            color='rgba(46, 46, 46, 0.5)'
                            // fontWeight='normal'
                            title={'Already have an account?'}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <CustomText
                                style={{ marginLeft: Metrics.ratio(10) }}
                                fontSize={Metrics.ratio(16)}
                                color={Colors.primary}
                                fontWeight='bold'
                                title={'LOGIN'}
                            />
                        </TouchableOpacity>
                    </View>
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
