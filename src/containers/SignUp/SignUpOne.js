import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';







export default function SignUpOne({ navigation }) {
    const dispatch = useDispatch();
    const { full_name,
        username,
        email,
        phone,
        password, is_email_verified } = useSelector(state => state.root);

    const [name, setName] = useState(full_name === '' ? '' : full_name);
    const [userName, setUsername] = useState(username === '' ? '' : username);
    const [_email, setEmail] = useState(email === '' ? '' : email);
    const [mobile, setMobile] = useState(phone === '' ? '' : phone);
    const [_password, setPassword] = useState(password === '' ? '' : password);
    const [retypePassword, setRetypePassword] = useState(password === '' ? '' : password)
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [verificationCode, setVerificationCode] = useState(null);
    const [newVerificationCode, setNewVerificationCode] = useState(null);

    const array = [
        { title: 'Name', onChangeText: (name) => (setName(name), getUserName(name)), value: name },
        { title: 'Username', onChangeText: setUsername, value: userName },
        { title: 'Email', onChangeText: setEmail, value: _email },
        { title: 'Mobile Number', onChangeText: setMobile, value: mobile },
        { title: 'Password', onChangeText: setPassword, value: _password, shown: showPassword },
        { title: 'Re-type Password', onChangeText: setRetypePassword, value: retypePassword, shown: showConfirmPassword },
    ]


    const getUserName = async (name) => {

        try {
            const response = await axios.post('https://arabiansuperstar.org/api/getusername', { name }, { headers: { 'content-type': 'application/json' } });
            console.log(response?.data)
            setUsername(response?.data?.name)
        } catch (error) {
            console.log({ error })
        }
    }

    const checkEmail = async (email) => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/check_email', { email }, { headers: { 'content-type': 'application/json' } });
            console.log({ username: response?.data })
            setIsLoading(false)
            if (response?.data === 'Email Not Exists' || response?.data?.msg === 'Email Not Found') {
                return true
            } else {
                return false
            }
        } catch (error) {
            alert('Something went wrong')
            console.log({ error })
            setIsLoading(false)
        }
    }

    const handleErrors = async () => {
        if (!name !== '' && !userName !== '' && _email !== '' && _password !== '' && retypePassword !== '' && mobile !== '') {
            //   return true;
            if (mobile.length < 11 || mobile.length > 13) {
                alert('Phone number must be greater than 11 digits and less than 13 digits')
                return false
            }

            if (_password === retypePassword) {
                setIsLoading(true)
                if (await checkEmail(_email)) {
                    dispatch({ type: 'full_name', payload: name })
                    dispatch({ type: 'username', payload: userName })
                    dispatch({ type: 'email', payload: _email })
                    dispatch({ type: 'password', payload: retypePassword })
                    dispatch({ type: 'phone', payload: mobile })
                    navigation.navigate('SignUpTwo')
                } else {
                    setIsLoading(false)
                    alert('Email already exists')
                }
            } else {
                setIsLoading(false)
                alert('Password does not match')
            }
        } else {
            setIsLoading(false)
            alert('Please fill all the fields')
        }
    };


    const verifyEmail = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/send_varification_email', { email : _email }, { headers: { 'content-type': 'application/json' } });
            console.log({ verifyEmail: response?.data })
            setIsLoading(false)
           if(response?.data?.status === 'success'){
              setVerificationCode(response?.data?.random_id)
           }
        } catch (error) {
            alert('Something went wrong')
            console.log({ error })
            setIsLoading(false)
        }
    }
 
    const checkCode = () =>{
console.log({verificationCode , newVerificationCode})
        if(verificationCode == newVerificationCode){
            setVerificationCode(null)
            dispatch({ type: 'is_email_verified', payload: true })
            alert('Verification Successful')
        }else{
            alert('Invalid Code')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView>
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
                                title={item.title}
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
                                    style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width: (index === 4 || index === 5) ? Metrics.screenWidth * 0.7 : Metrics.screenWidth * 0.8 }}
                                    keyboardType={item.title === 'Mobile Number' ? 'numeric' : 'default'}
                                    editable={index === 1 ? false : (index === 2 && (verificationCode || is_email_verified))  ? false : true}

                                    onChangeText={text => item.onChangeText(text)}
                                    secureTextEntry={item.shown}                                    value={item.value}
                                />
                                {(index === 4 || index === 5) && <TouchableOpacity
                                    onPress={() => item.shown ? index === 4 ? setShowPassword(false) : setShowConfirmPassword(false) : index === 4 ? setShowPassword(true) : setShowConfirmPassword(true)}
                                ><CustomText
                                        style={{
                                            // width: Metrics.screenWidth * 0.7,
                                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                                            marginTop: Metrics.ratio(12),
                                            fontFamily: Fonts.type.RobotoRegular
                                        }}
                                        fontSize={Metrics.ratio(13)}
                                        color='rgba(46, 46, 46, 0.7)'
                                        fontWeight='bold'
                                        title={!item.shown ? 'Hide' : 'Show'}
                                    />
                                </TouchableOpacity>}
                            </View>
                            {index === 2 && <>
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
                                    style={{ fontFamily: Fonts.type.RobotoRegular, color: '#000', width: (index === 4 || index === 5) ? Metrics.screenWidth * 0.7 : Metrics.screenWidth * 0.8 }}
                                    keyboardType={'numeric'}
                                    editable={index === 1 ? false : true}
                                    value={newVerificationCode}
                                    onChangeText={text => setNewVerificationCode(text)}
                                    secureTextEntry={item.shown}
                                />
                            </View>
                            </>
                            }
                           {!is_email_verified && <Button
                                    onPress={() => _email !== '' ? verificationCode ? checkCode() : verifyEmail() : alert('Email is required')}
                                    height={Metrics.ratio(35)}
                                    width={Metrics.screenWidth * 0.8}
                                    fontSize={Metrics.ratio(15)}
                                    title={!verificationCode ?'Send Code':  'Verify Email'}
                                    fontFamily={Fonts.type.RobotoRegular}
                                    style={{ alignSelf: 'center', marginVertical: Metrics.ratio(10) }}
                                    radius={Metrics.ratio(11)}
                                />}
                            </>}
                        </>
                    )
                })}
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <Button
                        onPress={() => is_email_verified ? (handleErrors()) : alert('Please verify your email first')}
                        height={Metrics.ratio(40)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='NEXT'
                        fontFamily={Fonts.type.RobotoRegular}
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
                            style={{ fontFamily: Fonts.type.RobotoRegular }}
                            fontSize={Metrics.ratio(15)}
                            color='rgba(46, 46, 46, 0.5)'
                            // fontWeight='normal'
                            title={'Already have an account?'}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <CustomText
                                style={{ marginLeft: Metrics.ratio(10), fontFamily: Fonts.type.RobotoBold }}
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
