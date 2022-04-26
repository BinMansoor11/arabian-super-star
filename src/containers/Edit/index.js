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
    CheckBox,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';




export default function Edit({ navigation, route }) {

    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState(null)
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
        userData,
        
    } = useSelector(state => state.root);
    // } = useSelector(state => state.root);
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [textColor, setTextColor] = useState();
    const [tzOffsetInMinutes, setTzOffsetInMinutes] = useState(undefined);
    const [accentColor, setAccentColor] = useState();
    // const [display, setDisplay] = useState(DISPLAY_VALUES[0]);
    const [interval, setMinInterval] = useState(1);
    const [neutralButtonLabel, setNeutralButtonLabel] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const [minimumDate, setMinimumDate] = useState();
    const [maximumDate, setMaximumDate] = useState();
    const [date, setDate] = useState(new Date())
    const [shownDate, setShownDate] = useState('')
    const [dateToBeSent, setDateToBeSent] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [nationalities, setNationalities] = useState([]);
    const [_zodiac, setZodiac] = useState('')
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [modalOption, setModalOption] = useState(null);
    const [_nationality, setNationality] = useState('');
    const [_country, setCountry] = useState('');

    const [_fullName, setFullName] = useState('');
    const [_phone, setPhone] = useState('');
    const [_bio, setBio] = useState('');
    const [_hobbies, setHobbies] = useState('');
    const [_password, setPassword] = useState('');
    const [_nominations, setNominations] = useState([]);
    const [_prof_Nominations, setProfNominations] = useState([]);



    const options = {
        title: 'select an option',
        mediaType: 'video',
    }

    const [images, setImages] = useState([]);
    const [imagesToBeSent, setImagesToBeSent] = useState([]);
    const [video, setVideo] = useState('');
    const [isPaused, setIsPaused] = useState(false)
    const [profilePic, setProfilePic] = useState({})
    const [sendVideo, setSendVideo] = useState(null)

    const [tabs, setTabs] = useState('Edit Profile');



    const [verificationCode, setVerificationCode] = useState(null);
    const [newVerificationCode, setNewVerificationCode] = useState(null);
    const [_email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [iFrame, setIframe] = useState('');




    const getPictures = (index) => {
        launchImageLibrary({}, (response) => {
            // console.log(JSON.stringify(response?.assets[0]?.uri,null,2))
            const newImages = [...images];
            console.log({ newImagesBef: newImages })
            RNFS.readFile(response?.assets[0]?.uri, 'base64').then(res => {
                newImages[index] = {
                    uri: response?.assets[0]?.uri,
                    type: 'image/jpeg',
                    name: 'filename',
                    data: res
                }
                for (let i = newImages?.length; i < 21; i++) {
                    newImages.push({})
                }
                // setImages(imgArray)
                
                setImages(newImages);
                setImagesToBeSent([...imagesToBeSent, {
                    uri: response?.assets[0]?.uri,
                    type: 'image/jpeg',
                    name: 'filename',
                    data: res
                }])
                // setIsLoading(false)
                console.log({ newImages })
            })
                .catch(err => {
                    console.log(err.message, err.code);
                });

            // var imgArray = [...response?.data?.userdetail?.geller_images]


        })
    }


    const getProfilePic = () => {
        launchImageLibrary({}, (response) => {
            RNFS.readFile(response?.assets[0]?.uri, 'base64').then(res => {
                setProfilePic({
                    uri: response?.assets[0]?.uri,
                    type: 'image/jpeg',
                    name: 'filename',
                    data: res
                })

            })
                .catch(err => {
                    console.log(err.message, err.code);
                });

        })
    }

    const getVideo = () => {
        launchImageLibrary(options, (response) => {
            console.log(response)
            if (response?.assets) {
                setVideo(response?.assets[0]?.uri)
                setTimeout(() => {
                    setIsPaused(true)
                }, 500);
            }
            RNFS.readFile(response?.assets[0]?.uri, 'base64').then(res => {
                setSendVideo({
                    name: "name.mp4",
                    uri: response?.assets[0]?.uri,
                    type: 'video/mp4',
                    video: res
                })
            })
                .catch(err => {
                    console.log(err.message, err.code);
                });

        })


    }



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
            const newdate = _day + "/" + _month + "/" + _year;
            setShownDate(newdate)
            setDateToBeSent(dateObj)

            // console.log(toMonthName(1), _month)
            setZodiac(getZodiac(dateObj))
            // dispatch({ type: 'dateToBeShown', payload: {_day, _month, _year} })
        } else {
            alert('You must be 18 years old to register')
        }

    }

    const getZodiac = (date) => {
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo",    "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
        let month = date.getMonth();
        let day = date.getDate();
        if(month == 0 && day <= 20){
           month = 11;
        }else if(day < days[month]){
           month--;
        };
        return signs[month];
     };


    // const getZodiac = async (day, month) => {
    //     try {
    //         const response = await axios.post('https://arabiansuperstar.org/api/astro_sign', { day: `${day}`, month: month?.toLowerCase() }, { headers: { 'content-type': 'application/json' } });
    //         console.log(response?.data)
    //         setZodiac(response?.data?.sign)
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }



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

    const getUserDetails = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/fetch_my_detail',
                { userid: userData?.id },
                { headers: { "Content-Type": "application/json" } });
            console.log({ fetch_my_detail: response?.data?.userdetail })
            setUserProfile(response?.data?.userdetail)
            var imgArray = [...response?.data?.userdetail?.geller_images]
            for (let i = 0; i < 21; i++) {
                !imgArray[i]?.image && imgArray.push({})
            }
            setImages(imgArray)
            setProfNominations(response?.data?.userdetail?.nominities)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
    }





    var serializeForm = function (formData) {
        console.log({ formData })
        var obj = {};
        for (var key of formData?._parts) {
            obj[key[0]] = key[1];
        }
        return obj;
    };

    const edit = async () => {
        var bodyFormData = new FormData();

        bodyFormData.append('userid', userProfile?.id);
        bodyFormData.append('bio', _bio !== '' ? _bio : userProfile?.bio)
        {sendVideo   && bodyFormData.append('video', sendVideo?.video)}
        bodyFormData.append('hobbies', _hobbies !== '' ? _hobbies : userProfile?.hobbies)
        bodyFormData.append('country', _country !== '' ? _country : userProfile?.country_of_residence)
        bodyFormData.append('nationality', _nationality !== '' ? _nationality : userProfile?.nationality)
        bodyFormData.append('social_avatar', social_profile_image !== '' ? social_profile_image : 'N/A')
        bodyFormData.append('social_name', social_name === '' ? 'N/A' : social_name)
        bodyFormData.append('social_email', social_email !== '' ? social_email : 'N/A')
        bodyFormData.append('social_id', social_id !== '' ? social_id : 'N/A')
        bodyFormData.append('social_type', social_type !== '' ? social_type : 'N/A')
        bodyFormData.append('profile', profilePic?.uri  ? profilePic?.data : 'N/A')
        bodyFormData.append('fullname', _fullName !== '' ? _fullName : userProfile?.full_name)
        bodyFormData.append('username', username !== '' ? username : userProfile?.username)
        bodyFormData.append('email', email !== '' ? email : userProfile?.email)
        bodyFormData.append('phone', _phone !== '' ? _phone : userProfile?.phone)
        bodyFormData.append('password', password !== '' ? password : userProfile?.pwd)
        bodyFormData.append('gender', gender === 0 ? 'Male' : 'Female')
        bodyFormData.append('d_o_b', date_of_birth !== '' ? date_of_birth : dateToBeSent)
        bodyFormData.append('zodiac', _zodiac !== '' ? _zodiac : userProfile?.zodiac)
        bodyFormData.append('selected_nominities', userProfile?.nominations)

        const imgs = images.filter(image => Object.keys(image).length !== 0)
        console.log({ imgs, kj:_phone.length })
        // bodyFormData.append('gellery', imgs?.length !== userProfile?.geller_images?.length ? imgs : userProfile?.geller_images)
        bodyFormData.append('gellery', imagesToBeSent?.length === 0 ? [] : imagesToBeSent)
        if (_phone.length < 11 || _phone.length > 13) {
            alert('Phone number must be greater than 11 digits and less than 13 digits')
            return false
        }
        try {

            const response = await axios.post('https://arabiansuperstar.org/api/edituser',
                serializeForm(bodyFormData),
                { headers: { "Content-Type": "application/json" } }
            );
            console.log({ edit: response })
            setIsLoading(false)
            //     dispatch({ type: 'isLoggedIn', payload: true })
            //     dispatch({ type: 'userData', payload: response?.data })
            // //     dispatch({ type: 'userId', payload: true })
            // navigation.navigate('MyTabs')
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
        getCountries()
        getNomination()
    }, [])

    const onPickerSelect = (title) => {
        modalOption === 'nationality' ? setNationality(title) : setCountry(title)
        setOptionModalVisible(!optionModalVisible)

    }

    const deleteImage = async (item, index) => {
        console.log({ item, index })
        setIsLoading(true)
        try {

            const response = await axios.post('https://arabiansuperstar.org/api/gallery_remove',
                {
                    imgid: item.id,
                    // userid: userProfile?.id
                },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log({ update: response })
            getUserDetails()
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }


    const setActive = async (index) => {
        const duplicateArray = [..._nominations];

        setIsLoading(true)
        try {

            const response = await axios.post(`https://arabiansuperstar.org/api/${duplicateArray[index].seleced ? 'nominity_remove': 'nominity_add'}`,
                {
                    nid: duplicateArray[index]?.id,
                    user_id: userProfile?.id
                },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log({ nominations: response })

            
        duplicateArray[index].seleced = duplicateArray[index]?.seleced ? 0 : 1
        console.log({ duplicateArray })
        setNominations(duplicateArray)
        setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }

        // setNomins(getActives())
    }

    const getActives = () => {
        const actives = _nominations.filter(item => item.active === true)
        const activeIds = actives.map(item => item.id)
        return activeIds
    }


    const getNomination = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/user_nominites', { gender: gender === 0 ? 'Male' : 'Female', user_id: userData?.id }, { headers: { 'content-type': 'application/json' } });
            const arrayNomins = []
            for (const [key, value] of Object.entries(response?.data)) {
                // console.log(value,key)
                
                arrayNomins.push(value)
            }
            // setNationalities(response?.data)
            console.log({ getNominations: response?.data, arrayNomins })
            setNominations(arrayNomins)

            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    const checkCode = () =>{
        console.log({verificationCode , newVerificationCode})
                if(verificationCode == newVerificationCode){
                    setVerificationCode(null)
                    // dispatch({ type: 'is_email_verified', payload: true })
                    setEmailVerified(true)
                    alert('Verification Successful')
                }else{
                    alert('Invalid Code')
                }
            }
        
            const verifyEmail = async () => {
                setIsLoading(true)
                try {
                    const response = await axios.post('https://arabiansuperstar.org/api/send_varification_email', { email : _email === '' ? userProfile?.email : _email }, { headers: { 'content-type': 'application/json' } });
                    console.log({ verifyEmail: response?.data })
                    setIsLoading(false)
                   if(response?.data?.status === 'success'){
                      setVerificationCode(response?.data?.random_id)
                   }else{
                          alert(response?.data?.msg)
                   }
                } catch (error) {
                    // alert('Something went wrong')
                    console.log({ error })
                    setIsLoading(false)
                }
            }

            const updateEmail = async () => {
                setIsLoading(true)
                try {
                    const response = await axios.post('https://arabiansuperstar.org/api/update_email', { email : _email, user_id:userProfile?.id }, { headers: { 'content-type': 'application/json' } });
                    console.log({ verifyEmail: response?.data })
                    setIsLoading(false)
                //    if(response?.data?.status === 'success'){
                       setEmailVerified(false)  
                      alert('Email Updated Successfully')
                //    }
                } catch (error) {
                    // alert('Something went wrong')
                    console.log({ error })
                    setIsLoading(false)
                }
            }

            const addIframe = async () => {
                setIsLoading(true)
                try {
                    const response = await axios.post('https://arabiansuperstar.org/api/insert_iframe', { iframe_data : iFrame, user_id: userProfile?.id }, { headers: { 'content-type': 'application/json' } });
                    console.log({ verifyEmail: response?.data })
                    setIsLoading(false)
                //    if(response?.data?.status === 'success'){
                    //    setEmailVerified(false)  
                      alert('Iframe Added Successfully')
                //    }
                } catch (error) {
                    // alert('Something went wrong')
                    console.log({ error })
                    setIsLoading(false)
                }
            }
            

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {isLoading && <ActivityIndicator
                    isLoading={true}
                    size="large"
                />}
                <View style={{ marginBottom: Metrics.screenHeight * 0.02 }}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
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
                    </TouchableOpacity>
                </View>
                <ScrollView  >
                    <View style={{ marginBottom: Metrics.screenHeight * 0.1 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {['Edit Profile', 'Edit Media', 'Edit Nominations', 'Edit Email', 'Add Url'].map((item, index) => {
                                        return <TouchableOpacity onPress={() => setTabs(item)}>
                                            <CustomText
                                                style={{
                                                    // width: Metrics.screenWidth * 0.5,
                                                    alignSelf: 'center',
                                                    marginTop: Metrics.ratio(15),
                                                    marginLeft: Metrics.ratio(35),
                                                    marginRight: index === 4 ?  Metrics.ratio(25) : 0
                                                }}
                                                fontSize={Metrics.ratio(24)}
                                                color={tabs === item ? '#000' : 'rgba(0, 0, 0, 0.5)'}
                                                fontWeight='bold'
                                                title={item}
                                            />
                                        </TouchableOpacity>
                                    })}
                                </ScrollView>
                            </>
                        </View>
                        {tabs === 'Edit Profile' ? <>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1

                            }}>
                                {/* <Icons.Feather name='user' color={'#000'} size={Metrics.ratio(20)} /> */}
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Full Name'
                                    onChangeText={(text) => setFullName(text)}
                                    value={_fullName !== '' ? _fullName : userProfile?.full_name}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent:
                                        'space-between',
                                    alignItems: 'center',
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    height: Metrics.screenHeight * 0.1
                                }}>
                                {/* <Icons.Feather name='lock' size={Metrics.ratio(20)} /> */}
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Date Of Birth'
                                    value={shownDate !== '' ? shownDate : JSON.stringify(userProfile?.date_of_birth)?.substring(0, JSON.stringify(userProfile?.date_of_birth)?.indexOf('T'))?.split('-')?.reverse()?.join('/')}
                                    disabled={true}
                                />
                            </TouchableOpacity>

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

                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Zodiac'
                                    value={_zodiac === '' ? userProfile?.zodiac : _zodiac}
                                    disabled={true}
                                />
                            </View>

                            {/* <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Gender'
                                    value={gender === 0 ? 'Male' : 'Female'}
                                />
                            </View> */}
                            {/* <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Email'
                                    value={userProfile?.email}
                                    disabled
                                />
                            </View> */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                {/* <Icons.Feather name='lock' size={Metrics.ratio(20)} /> */}
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Mobile'
                                    onChangeText={(text) => setPhone(text)}
                                    value={_phone !== '' ? _phone : userProfile?.phone}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => (setOptionModalVisible(true), setModalOption('country'))}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent:
                                        'space-between',
                                    alignItems: 'center',
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    height: Metrics.screenHeight * 0.1
                                }}>
                                {/* <Icons.Feather name='lock' size={Metrics.ratio(20)} /> */}
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Country of Residence'
                                    value={_country !== '' ? _country : userProfile?.country_of_residence}
                                    disabled={true}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => (setOptionModalVisible(true), setModalOption('nationality'))}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent:
                                        'space-between',
                                    alignItems: 'center',
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    height: Metrics.screenHeight * 0.1
                                }}>
                                {/* <Icons.Feather name='lock' size={Metrics.ratio(20)} /> */}
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Nationality'
                                    value={_nationality !== '' ? _nationality : userProfile?.nationality}
                                    disabled={true}
                                />
                            </TouchableOpacity>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Bio'
                                    value={_bio !== '' ? _bio : userProfile?.bio}
                                    onChangeText={(text) => setBio(text)}
                                    multiline={true}
                                    maxLength={100}
                                />
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Hobbies'
                                    maxLength={50}
                                    value={_hobbies !== '' ? _hobbies : userProfile?.hobbies}
                                    onChangeText={(text) => setHobbies(text)}
                                />
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center',
                                height: Metrics.screenHeight * 0.1
                            }}>
                                <CustomTextInput
                                    customStyle={{ width: Metrics.screenWidth * 0.8 }}
                                    placeholder='Password'
                                    rightButton
                                    onChangeText={(text) => setPassword(text)}
                                    value={_password !== '' ? _password : userProfile?.pwd}
                                />
                            </View>

                            <Button
                                onPress={() => edit()}
                                height={Metrics.ratio(50)}
                                width={Metrics.screenWidth * 0.8}
                                fontSize={Metrics.ratio(15)}
                                title='EDIT PROFILE'
                                style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(20) }}
                                radius={Metrics.ratio(11)}
                            />
                        </>
                            :
                            tabs === 'Edit Media' ? <>

                                <CustomText
                                    style={{
                                        width: Metrics.screenWidth * 0.8,
                                        alignSelf: 'center', marginTop: Metrics.ratio(10),
                                        marginVertical: Metrics.ratio(15),
                                    }}
                                    fontSize={Metrics.ratio(14)}
                                    color='#000'
                                    fontWeight='normal'
                                    title={'Profile Pic'}
                                />


                                <View style={{
                                    flexDirection: 'row',
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    height: Metrics.screenHeight * 0.3,
                                    marginBottom: Metrics.ratio(50),
                                }} >
                                    {/* {(userProfile?.social_profile_image || profilePic?.uri) && <TouchableOpacity style={{
                                    // alignSelf: 'flex-end',
                                    // marginRight:Metrics.ratio(25),
                                    position: 'absolute',
                                    top: Metrics.ratio(2),
                                    right: -Metrics.ratio(7),
                                    zIndex: 111,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    height: Metrics.ratio(22),
                                    width: Metrics.ratio(22),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: Metrics.ratio(22)
                                }}
                                // onPress={() => setOptionModalVisible(true)}
                                >
                                    <Icons.Entypo name={'cross'} color={'#fff'} size={Metrics.ratio(15)} />
                                </TouchableOpacity>} */}
                                    <TouchableOpacity
                                        onPress={() => getProfilePic()}
                                        style={{
                                            height: Metrics.screenHeight * 0.3,
                                            width: Metrics.screenWidth * 0.8,
                                            borderWidth: Metrics.ratio(1),
                                            borderRadius: Metrics.ratio(11),
                                            borderColor: '#CC2D3A',
                                            marginBottom: Metrics.ratio(20),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            overflow: 'hidden'
                                        }}>
                                        {(userProfile?.social_profile_image || profilePic?.uri) ? <Image style={{ height: '100%', width: '100%', }} source={{ uri: profilePic?.uri ? profilePic?.uri : `https://arabiansuperstar.org/public/${userProfile?.social_profile_image}` }} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />
                                        }</TouchableOpacity>
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
                                    title={'Photos'}
                                />


                                <View style={{
                                    flexDirection: 'row',
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    height: Metrics.screenHeight * 0.45,
                                    marginBottom: Metrics.ratio(50),
                                }} >
                                    {images?.map((item, index) => {
                                        return (
                                            <View>
                                                {(item?.uri || item?.imagepath) && <TouchableOpacity
                                                    onPress={() => deleteImage(item, index)}
                                                    style={{
                                                        // alignSelf: 'flex-end',
                                                        // marginRight:Metrics.ratio(25),
                                                        position: 'absolute',
                                                        top: -Metrics.ratio(5),
                                                        right: -Metrics.ratio(5),
                                                        zIndex: 111,
                                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                                        height: Metrics.ratio(18),
                                                        width: Metrics.ratio(18),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: Metrics.ratio(18)
                                                    }}
                                                // onPress={() => setOptionModalVisible(true)}
                                                >
                                                    <Icons.Entypo name={'cross'} color={'#fff'} size={Metrics.ratio(15)} />
                                                </TouchableOpacity>}
                                                <TouchableOpacity
                                                    onPress={() => getPictures(index)}
                                                    style={{
                                                        height: Metrics.screenHeight * 0.08,
                                                        width: Metrics.screenWidth * 0.15,
                                                        borderWidth: Metrics.ratio(1),
                                                        borderRadius: Metrics.ratio(11),
                                                        borderColor: '#CC2D3A',
                                                        marginBottom: Metrics.ratio(20),
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        overflow: 'hidden'
                                                    }}
                                                    disabled={(item?.uri || item?.imagepath) ? true : false}
                                                >
                                                    {(item?.uri || item?.imagepath) ? <Image style={{ height: '100%', width: '100%', }} source={{ uri: item?.uri ? item?.uri : `https://arabiansuperstar.org/public/${item?.imagepath}/${item?.image}` }} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />
                                                    }
                                                </TouchableOpacity>
                                            </View>)
                                    })}
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
                                    title={'Video'}
                                />

                                <TouchableOpacity
                                    onPress={() => getVideo()}
                                    style={{
                                        height: Metrics.screenHeight * 0.3,
                                        width: Metrics.screenWidth * 0.8,
                                        borderWidth: Metrics.ratio(1),
                                        borderRadius: Metrics.ratio(11),
                                        borderColor: '#CC2D3A',
                                        marginBottom: Metrics.ratio(20),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        // overflow: 'hidden'
                                    }}>
                                    {/* {true &&
                                         <TouchableOpacity style={{
                                    // alignSelf: 'flex-end',
                                    // marginRight:Metrics.ratio(25),
                                    position: 'absolute',
                                    top: -Metrics.ratio(7),
                                    right: -Metrics.ratio(7),
                                    zIndex: 111,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    height: Metrics.ratio(22),
                                    width: Metrics.ratio(22),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: Metrics.ratio(22)
                                }}
                                // onPress={() => setOptionModalVisible(true)}
                                >
                                    <Icons.Entypo name={'cross'} color={'#fff'} size={Metrics.ratio(15)} />
                                </TouchableOpacity>} */}
                                    {/* {video === '' ? <Video source={{ uri: video === '' ? video_path?.uri : video }} style={{ width: '100%', height: '100%' }} resizeMode='cover' paused={isPaused} muted={true} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />} */}
                                    <Video source={{ uri: video === '' ? video_path?.uri : video }} style={{ width: '100%', height: '100%' }} resizeMode='cover' paused={isPaused} muted={true} />
                                </TouchableOpacity>
                                <Button
                                    onPress={() => edit()}
                                    height={Metrics.ratio(50)}
                                    width={Metrics.screenWidth * 0.8}
                                    fontSize={Metrics.ratio(15)}
                                    title='EDIT MEDIA'
                                    style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(20) }}
                                    radius={Metrics.ratio(11)}
                                />
                            </> : tabs === 'Edit Nominations' ? <View style={{ height: Metrics.screenHeight * 0.7 }}>
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
                                                border={item?.seleced ? false : true}
                                                disabled={item?.nominity_name === 'Arabian SuperStar' ? true : false}
                                            />
                                        )
                                    })}


                                </View>

                            </View> : tabs === 'Edit Email' ? <View style={{ height: Metrics.screenHeight * 0.7,paddingTop: Metrics.screenHeight * 0.05}}>
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
                                title={'Edit Email'}
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
                            }}>
                                <TextInput
                                    style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width: Metrics.screenWidth * 0.8 }}
                                    // keyboardType={item.title === 'Mobile Number' ? 'numeric' : 'default'}
                                    // editable={emailVerified}

                                    onChangeText={text => setEmail(text)}                    
                                    value={_email === '' ? userProfile?.email : _email}
                                />
                               
                            </View>
                                    
                             <>
                                {verificationCode && <>
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
                                title={'Verify Code'}
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
                            }}>
                                <TextInput
                                    style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width:Metrics.screenWidth * 0.8 }}
                                    keyboardType={'numeric'}
                                    // editable={index === 1 ? false : true}
                                    value={newVerificationCode}
                                    onChangeText={text => setNewVerificationCode(text)}
                                />
                            </View>
                            </>
                            }
                           <Button
                                    onPress={() => userProfile?.email !== '' ? verificationCode ? checkCode() : emailVerified ? updateEmail() : verifyEmail() : alert('Email is required')}
                                    height={Metrics.ratio(35)}
                                    width={Metrics.screenWidth * 0.8}
                                    fontSize={Metrics.ratio(15)}
                                    title={!verificationCode ? emailVerified ? 'Edit Email' : 'Send Code':  'Verify Email'}
                                    fontFamily={Fonts.type.RobotoRegular}
                                    style={{ alignSelf: 'center', marginVertical: Metrics.ratio(10) }}
                                    radius={Metrics.ratio(11)}
                                />
                            </>

                            </View> : <View style={{ height: Metrics.screenHeight * 0.7 }}>
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
                                title={'Add Url'}
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
                            }}>
                                <TextInput
                                    style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width: Metrics.screenWidth * 0.8 }}
                                    // keyboardType={item.title === 'Mobile Number' ? 'numeric' : 'default'}
                                    // editable={iFrame}

                                    onChangeText={text => setIframe(text)}                    
                                    value={iFrame}
                                />
                            </View>
                                <Button
                                    onPress={() => iFrame !== '' ? addIframe() : alert('Url is required')}
                                    height={Metrics.ratio(35)}
                                    width={Metrics.screenWidth * 0.8}
                                    fontSize={Metrics.ratio(15)}
                                    title={'Add Url'}
                                    fontFamily={Fonts.type.RobotoRegular}
                                    style={{ alignSelf: 'center', marginVertical: Metrics.ratio(10) }}
                                    radius={Metrics.ratio(11)}
                                />
                                </View>}
                    </View>
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

                                                return <TouchableOpacity onPress={() => onPickerSelect(item?.title)}>
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

                    </View>
                    <Image style={{

                        height: Metrics.screenHeight * 0.07,
                        width: Metrics.screenWidth * 0.6,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10), position: 'absolute', bottom: 0
                    }}
                        source={require('../../assets/images/logo.png')}
                        resizeMode='stretch'
                    />
                </ScrollView>
            </View>
        </Footer>
    )
}
