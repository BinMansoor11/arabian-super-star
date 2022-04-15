import React,{useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';




export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // signOut()
        GoogleSignin.configure({
            webClientId:
              '476972713318-bg3ubgifkrc0r6vv3678marfmliaab4e.apps.googleusercontent.com',
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            scopes: ['profile', 'email'],
          });
    },[])


    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();// Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };

      const checkSocialId= async (socialId) => {
        setIsLoading(true)
            try {
                const response = await axios.post('https://arabiansuperstar.org/api/check_social', { socialId }, { headers: { 'content-type': 'application/json' } });
                console.log({ response })
                if(response?.data?.status === 'error') {
                    setIsLoading(false)
                    return false
                }else{
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
          dispatch({ type: 'social_email', payload:userInfo.user?.email })
          dispatch({ type: 'social_profile_image', payload: userInfo.user?.photo })
          dispatch({ type: 'social_id', payload: userInfo.user?.id })
          dispatch({ type: 'social_type', payload: 'google' })
      
          if(await checkSocialId(userInfo.user?.id)){
            // login()
          }else{
            navigation.navigate('SignUpOne')
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
    


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
             {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView>
                <View style={{ height: Metrics.screenHeight * 0.8 }}>
                    <View style={{
                        borderBottomLeftRadius: Metrics.ratio(30),
                        borderBottomRightRadius: Metrics.ratio(30),
                        overflow: 'hidden',
                        height: Metrics.screenHeight * 0.59,
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


                    <View style={{ marginBottom: Metrics.screenHeight * 0.02 }}>

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(15),
                                fontFamily: Fonts.type.RobotoBold
                            }}
                            fontSize={Metrics.ratio(24)}
                            color='#000'
                            fontWeight='bold'
                            title={'Sign Up'}
                        />
                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(10),
                                fontFamily: Fonts.type.RobotoRegular
                            }}
                            fontSize={Metrics.ratio(14)}
                            color='rgba(46, 46, 46, 0.5)'
                            // fontWeight='normal'
                            title={'Or Sign up with'}
                        />

                    </View>
                    <TouchableOpacity onPress={()=> signIn()}>
                    <Image style={{

                        height: Metrics.screenHeight * 0.08,
                        alignSelf: 'center',
                        // marginTop: Metrics.ratio(10)
                    }}
                        source={require('../../assets/images/social.png')}
                        resizeMode='contain'
                    />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1, height: Metrics.screenHeight * 0.2 }}>

                    <Button
                        onPress={() => navigation.navigate('SignUpOne')}
                        height={Metrics.ratio(40)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(16)}
                        title='NEXT'
                        fontFamily={Fonts.type.RobotoRegular}
                        style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(20), fontFamily: Fonts.type.RobotoRegular }}
                        radius={Metrics.ratio(10)}
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
