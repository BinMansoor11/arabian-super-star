import React, { useState, useEffect } from 'react'
import { View, Text, BackHandler, Image, TouchableOpacity, ScrollView } from 'react-native'
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
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Login({ navigation, route }) {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.root);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const backAction = () => {
        BackHandler.exitApp()
        return true;
    };

    useEffect(() => {
        // signOut()
        GoogleSignin.configure({
            webClientId:
                '476972713318-bg3ubgifkrc0r6vv3678marfmliaab4e.apps.googleusercontent.com',
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            scopes: ['profile', 'email'],
        });

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])


    const handleErrors = () => {
        if (email !== '', password !== '') {
            //   return true;
            login()
        } else {
            alert('Please fill all the fields')
        }
    };

    const checkSocialId = async (socialId) => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/check_social', { socialId }, { headers: { 'content-type': 'application/json' } });
            console.log({ response })
            if (response?.data?.status === 'error') {
                setIsLoading(false)
                return false
            } else {
                setIsLoading(false)
                return true
            }

        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.user);
            dispatch({ type: 'social_name', payload: userInfo.user?.name })
            dispatch({ type: 'social_email', payload: userInfo.user?.email })
            dispatch({ type: 'social_profile_image', payload: userInfo.user?.photo })
            dispatch({ type: 'social_id', payload: userInfo.user?.id })
            dispatch({ type: 'social_type', payload: 'google' })

            if (await checkSocialId(userInfo.user?.id)) {
                login()
            } else {
                navigation.navigate('SignUp')
            }

        } catch (error) {
            console.log('error: ', error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                // setLoading(false)
                alert(error.message)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                // setLoading(false)
                alert(error.message)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                // setLoading(false)
                alert(error.message)
            } else {
                // some other error happened
                // setLoading(false)
                alert(error.message)
            }
        }
    };


    const login = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/signin', { email, password }, { headers: { 'content-type': 'application/json' } });
            console.log({ response })
            // setUsername(response?.data?.username)
            if (response?.data) {
                dispatch({ type: 'userData', payload: response?.data?.user })
                dispatch({ type: 'token', payload: response?.data?.token })
                dispatch({ type: 'isLoggedIn', payload: true })
                setIsLoading(false)
                navigation.navigate('Home')
            } else {
                alert('Invalid Credentials')
                setIsLoading(false)
            }

        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView>
                <View style={{
                    borderBottomLeftRadius: Metrics.ratio(30),
                    borderBottomRightRadius: Metrics.ratio(30),
                    overflow: 'hidden',
                    height: Metrics.screenHeight * 0.35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000'
                }}>

                    <Image style={{

                        height: Metrics.screenHeight * 0.3,
                    }}
                        source={require('../../assets/images/login.png')}
                        resizeMode='contain'
                    />
                </View>


                <View style={{ marginBottom: Metrics.screenHeight * 0.05 }}>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(15),
                            fontFamily: Fonts.type.RobotoBold,
                        }}
                        fontSize={Metrics.ratio(24)}
                        color='#000'
                        fontWeight='bold'
                        title={'Login'}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent:
                            'space-between',
                        alignItems: 'center',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        height: Metrics.screenHeight * 0.13

                    }}>
                        {/* <Icons.Feather name='user' color={'#000'} size={Metrics.ratio(20)} /> */}
                        <CustomTextInput
                            customStyle={{ width: Metrics.screenWidth * 0.8, fontFamily: Fonts.type.RobotoRegular }}
                            placeholder='Email'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent:
                            'space-between',
                        alignItems: 'center',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center'
                    }}>
                        {/* <Icons.Feather name='lock' size={Metrics.ratio(20)} /> */}
                        <CustomTextInput
                            customStyle={{ width: Metrics.screenWidth * 0.8, fontFamily: Fonts.type.RobotoRegular }}
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            rightButton={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={{ width: Metrics.screenWidth * 0.9, alignItems: 'flex-end' }}>

                        <CustomText
                            style={{ fontFamily: Fonts.type.RobotoRegular }}
                            fontSize={Metrics.ratio(14)}
                            color='rgba(46, 46, 46, 0.5)'
                            // fontWeight='normal'
                            title={'Forgot Password?'}
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    onPress={() => (handleErrors())}
                    height={Metrics.ratio(55)}
                    width={Metrics.screenWidth * 0.8}
                    fontSize={Metrics.ratio(16)}
                    title='LOGIN'
                    style={{ alignSelf: 'center' }}
                    fontFamily={Fonts.type.RobotoRegular}
                    radius={Metrics.ratio(10)}
                />
                <CustomText
                    style={{ alignSelf: 'center', marginTop: Metrics.ratio(10), fontFamily: Fonts.type.RobotoRegular }}
                    fontSize={Metrics.ratio(14)}
                    color='rgba(46, 46, 46, 0.5)'
                    // fontWeight='normal'
                    title={'or login with'}
                />

                <TouchableOpacity onPress={() => signIn()}>
                    <Image style={{

                        height: Metrics.screenHeight * 0.08,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10)
                    }}
                        source={require('../../assets/images/social.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
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
                        title={'Don’t have an account?'}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <CustomText
                            style={{ paddingHorizontal: Metrics.ratio(10), fontFamily: Fonts.type.RobotoRegular }}
                            fontSize={Metrics.ratio(16)}
                            color={Colors.primary}
                            fontWeight='bold'
                            title={'SIGNUP'}
                        />
                    </TouchableOpacity>
                </View>
                <Image style={{

                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.6,
                    alignSelf: 'center',
                    marginTop: Metrics.ratio(10),
                    bottom: 0
                }}
                    source={require('../../assets/images/logo.png')}
                    resizeMode='stretch'
                />
            </ScrollView>
        </View>
    )
}
