import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import CountryPicker from 'react-native-country-picker-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



const array = ['Country of Residence', 'Nationality']

export default function SignUpTwo({ navigation }) {
    const dispatch = useDispatch();
    const { country_of_residence,
        nationality,
        gender,
        date_of_birth, dateToBeShown,
        zodiac } = useSelector(state => state.root);

    const [nationalities, setNationalities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const [tzOffsetInMinutes, setTzOffsetInMinutes] = useState(undefined);
    // const [mode, setMode] = useState(MODE_VALUES[0]);
    const [show, setShow] = useState(false);
    const [textColor, setTextColor] = useState();
    const [accentColor, setAccentColor] = useState();
    // const [display, setDisplay] = useState(DISPLAY_VALUES[0]);
    const [interval, setMinInterval] = useState(1);
    const [neutralButtonLabel, setNeutralButtonLabel] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const [minimumDate, setMinimumDate] = useState();
    const [maximumDate, setMaximumDate] = useState();
    const [countryCode, setCountryCode] = useState('AE');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [_nationality, setNationality] = useState(nationality === '' ? '' : nationality);
    const [_gender, setGender] = useState(gender === '' ? -1 : gender);


    const [optionModalVisible, setOptionModalVisible] = useState(false);

    const [country, setCountry] = useState(country_of_residence === 'United Arab Emirates' ? 'United Arab Emirates' : country_of_residence)
    const modalVisible = false
    const callingCode = null
    const withCountryNameButton = true
    const withFlag = true
    const withEmoji = true
    const withFilter = true
    const withAlphaFilter = true
    const withCallingCode = false

    const [_zodiac, setZodiac] = useState(zodiac === '' ? '' : zodiac)
    const [date, setDate] = useState(new Date())


    const getCountries = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/get_counties');
            setNationalities(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    const onSelect = (response) => {
        console.log({ response })
        setCountryCode(response?.cca2)
        setCountry(response?.name)
    }


    const handleErrors = () => {
        if (!country !== '' && !_nationality !== '' && _gender !== '' && date !== '' && _zodiac !== '') {
            //   return true;
            dispatch({ type: 'country_of_residence', payload: country })
            dispatch({ type: 'nationality', payload: _nationality })
            dispatch({ type: 'gender', payload: _gender })
            dispatch({ type: 'date_of_birth', payload: date })
            dispatch({ type: 'zodiac', payload: _zodiac })

            navigation.navigate('SignUpThree')
        } else {
            alert('Please fill all the fields')
        }
    };

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')


    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }


    const dateOfBirth = (timeStamp) => {

        if (getAge(timeStamp) > 18) {
            var dateObj = new Date(timeStamp);
            var _month = dateObj.getUTCMonth() + 1; //months from 1-12
            var _day = dateObj.getUTCDate();
            var _year = dateObj.getUTCFullYear();
            setDay(_day)
            setMonth(_month)
            setYear(_year)
            const newdate = _year + "/" + _month + "/" + _day;

            // console.log(getZodiac(dateObj))
            setZodiac(getZodiac(dateObj))

            dispatch({ type: 'dateToBeShown', payload: { _day, _month, _year } })
        } else {
            alert('You must be 18 years old to register')
        }

    }


    const getZodiac = (date) => {
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
        let month = date.getMonth();
        let day = date.getDate();
        if (month == 0 && day <= 20) {
            month = 11;
        } else if (day < days[month]) {
            month--;
        };
        return signs[month];
    };

    // const getZodiac = async (day, month) => {
    //     try {
    //         const response = await axios.post('https://arabiansuperstar.org/api/astro_sign', { day: day, month: month?.toLowerCase() }, { headers: { 'content-type': 'application/json' } });
    //         console.log(response?.data)
    //         setZodiac(response?.data?.sign)
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }

    useEffect(() => {
        getCountries()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView >

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

                    {array.map((item, index) => {
                        return (
                            <>
                                <CustomText
                                    style={{
                                        width: Metrics.screenWidth * 0.8,
                                        alignSelf: 'center', marginTop: Metrics.ratio(10),
                                        marginTop: Metrics.ratio(10),
                                        fontFamily: Fonts.type.RobotoRegular
                                    }}
                                    fontSize={Metrics.ratio(14)}
                                    color='#000'
                                    fontWeight='normal'
                                    title={item}
                                />
                                <View style={{
                                    height: Metrics.ratio(50),
                                    borderWidth: Metrics.ratio(1),
                                    borderColor: '#CC2D3A',
                                    borderRadius: Metrics.ratio(11),
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    marginTop: Metrics.ratio(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    {index < 1 ? <><CountryPicker
                                        {...{
                                            countryCode,
                                            withFilter,
                                            withFlag,
                                            withCountryNameButton,
                                            withAlphaFilter,
                                            withCallingCode,
                                            withEmoji,
                                            onSelect,
                                        }}
                                        modalVisible
                                        containerButtonStyle={{ height: '100%', width: Metrics.screenWidth * 0.75, justifyContent: 'center', marginLeft: Metrics.ratio(10) }}
                                    />
                                        <Icons.Ionicons name={'caret-down-sharp'} color={'#CC2D3A'} size={Metrics.ratio(20)} style={{ marginLeft: -Metrics.ratio(30) }} />
                                    </> :
                                        <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
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
                                            <TouchableOpacity onPress={() => setOptionModalVisible(true)} style={{ height: '100%', width: Metrics.screenWidth * 0.8, alignItems: 'center', flexDirection: 'row' }}>
                                                <CustomText
                                                    style={{
                                                        width: Metrics.screenWidth * 0.8,
                                                        alignSelf: 'center', marginTop: Metrics.ratio(10),
                                                        marginVertical: Metrics.ratio(15),
                                                        paddingLeft: Metrics.ratio(10),
                                                    }}
                                                    fontSize={Metrics.ratio(16)}
                                                    color='#000'
                                                    fontWeight='normal'
                                                    title={_nationality}
                                                />
                                                <Icons.Ionicons name={'caret-down-sharp'} color={'#CC2D3A'} size={Metrics.ratio(20)} style={{ marginLeft: -Metrics.ratio(38) }} />
                                            </TouchableOpacity>
                                        </View>}

                                </View>
                            </>
                        )
                    })}

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Gender'}
                    />

                    <View style={{
                        flexDirection: 'row',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                    }} >{['Male', 'Female'].map((item, index) => {
                        return <Button
                            onPress={() => setGender(index)}
                            height={Metrics.ratio(50)}
                            width={Metrics.screenWidth * 0.38}
                            fontSize={Metrics.ratio(15)}
                            title={item}
                            style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(10) }}
                            radius={Metrics.ratio(11)}
                            border={index === _gender ? false : true}
                        />
                    })}
                    </View>


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Date of Birth'}
                    />
                    <View style={{
                        flexDirection: 'row',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                    }} >

                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            {show && <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={tzOffsetInMinutes}
                                minuteInterval={interval}
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                                value={date}
                                // mode={mode}
                                is24Hour
                                // display={display}
                                onChange={(e) => (setShow(false), dateOfBirth(e?.nativeEvent?.timestamp))}
                                // style={styles.iOsPicker}
                                textColor={textColor || undefined}
                                accentColor={accentColor || undefined}
                                neutralButtonLabel={neutralButtonLabel}
                                disabled={disabled}
                            />}
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={dateToBeShown?._day ? dateToBeShown?._day : day}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={dateToBeShown?._month ? dateToBeShown?._month : month}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={dateToBeShown?._year ? dateToBeShown?._year : year}
                            />
                        </TouchableOpacity>
                    </View>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Zodiac'}
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
                        <TextInput editable={false} value={_zodiac} onChangeText={(text) => setZodiac(text)} style={{ color: '#000' }} />
                    </View>

                </View>

                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>
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
                        marginTop: Metrics.ratio(10), bottom: 0
                    }}
                        source={require('../../assets/images/logo.png')}
                        resizeMode='stretch'
                    />
                </View>
            </ScrollView>
        </View>
    )
}
