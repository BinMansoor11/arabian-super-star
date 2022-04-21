import React, { useState, useEffect } from 'react'
import { View, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Button,
    CustomText,
    Footer,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Video from 'react-native-video';
import axios from 'axios';
import { WithLocalSvg } from 'react-native-svg';
import AsyncStorage from "@react-native-community/async-storage";
import Share from 'react-native-share';




export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.root);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [votes, setVotes] = useState(0)
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [rating, setRating] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [user, setUser] = useState(null)
    const [stars, setStars] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const getSvg = (ratings) => {
        const numberOfStars = Math.floor(JSON.parse(ratings))
        if (numberOfStars === 0) {
            return require(`../../assets/images/star.png`)
        } else if (numberOfStars === 1) {
            return require(`../../assets/images/star-1.svg`)
        } else if (numberOfStars === 2) {
            return require(`../../assets/images/star-2.svg`)
        } else if (numberOfStars === 3) {
            return require(`../../assets/images/star-3.svg`)
        } else if (numberOfStars === 4) {
            return require(`../../assets/images/star-4.svg`)
        } else if (numberOfStars === 5) {
            return require(`../../assets/images/star-5.svg`)
        }


    }

    const TopButtonSection = [
        { isDisabled: user?.isAlreadyVoted ? true : false, color: user?.isAlreadyVoted ? Colors.primary : '#000', amount: votes, title: 'Vote', icon: require('../../assets/images/vote.png'), onPress: () => addVote() },
        { isDisabled: user?.isAlreadyLiked ? true : false, color: user?.isAlreadyLiked ? Colors.primary : '#000', amount: likes, title: 'Likes', icon: require('../../assets/images/like.png'), onPress: () => like() },
        { isDisabled: false, color: '#000', amount: comments, title: 'Comments', icon: require('../../assets/images/chat.png'), onPress: () => navigation.navigate('Comments', { userId: user?.id, profilePic: `https://arabiansuperstar.org/public/${user?.social_profile_image}` }) },
        { isDisabled: user?.isAlreadyRated ? true : false, color: user?.isAlreadyRated ? Colors.primary : '#000', amount: rating, title: 'Rating', icon:user?.rating && getSvg(user?.rating), onPress: () => (setRatingModalVisible(true)) },
    ]

    const getUserDetails = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/getuserdetail',
                { user_id: route?.params?.profileId ? route?.params?.profileId : userData?.id, cuurent_userid: userData?.id },
                { headers: { "Content-Type": "application/json" } });
            console.log({ res: response })
            setUser(response?.data?.userdetail)
            setVotes(response?.data?.userdetail?.votes)
            setLikes(response?.data?.userdetail?.likes)
            setComments(response?.data?.userdetail?.comments)
            setRating(response?.data?.userdetail?.rating)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
    }


    const addVote = async () => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/add_vote',
                { userid: userData?.id, profile_id: user?.id, country: user?.country_of_residence },
                { headers: { "Content-Type": "application/json" } });
            console.log({ Vote: response?.data })
            if (response?.data?.status == 'success') {
                const duplicate = { ...user }
                duplicate.isAlreadyVoted = 1
                setUser(duplicate)
                setVotes(votes + 1)
            } else {
                alert(response?.data?.msg)
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const addRating = async () => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/add_rating',
                { userid: userData?.id, profile_id: user?.id, rating: stars },
                { headers: { "Content-Type": "application/json" } });
            console.log({ res: response?.data })
            if (response?.data?.status == 'success') {
                const duplicate = { ...user }
                duplicate.isAlreadyRated = 1
                setUser(duplicate)
                getUserDetails()
            } else {
                alert(response?.data?.msg)
            }
        } catch (error) {
            console.log({ error })
        }
    }


    const like = async () => {
        // console.log({userid:userData?.id, profile_id:user?.id})
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/add_like',
                { userid: userData?.id, profile_id: user?.id },
                { headers: { "Content-Type": "application/json" } });
            console.log({ likes: response?.data })


            if (response?.data?.status == 'success') {
                const duplicate = { ...user }
                duplicate.isAlreadyLiked = 1
                setUser(duplicate)
                setLikes(likes + 1)
            } else {
                alert(response?.data?.msg)
            }

        } catch (error) {
            console.log({ error })
        }
    }


    useEffect(() => {
        isFocused && getUserDetails()
        setTimeout(() => {
            setIsPaused(true)
        }, 500);

        return () => setStars(null)
    }, [isFocused])

    const logout = async () => {
        setOptionModalVisible(!optionModalVisible)
        navigation.navigate('Login')
        await AsyncStorage.removeItem('root')
        dispatch({ type: 'userData', payload: null })
        dispatch({ type: 'token', payload: '' })
        dispatch({ type: 'isLoggedIn', payload: false })
    }


    const onShare = async () => {
        console.log({Share})
        const shareOptions = {
            title: 'Become an Arabian Superstar and get paid for your talent. Download the app here: https://play.google.com/store/apps/details?id=com.arabiansuperstar&hl=en',
            // email: 'email@example.com',
            social: Share.Social.EMAIL,
            failOnCancel: false,
          };
        Share.open(shareOptions)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
        // try {
        //     const result = await Share.open({
        //         message:
        //             'Become an Arabian Superstar and get paid for your talent. Download the app here: https://play.google.com/store/apps/details?id=com.arabiansuperstar&hl=en',
        //     });
        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    };

    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {isLoading && <ActivityIndicator
                    isLoading={true}
                    size="large"
                />}
                <ScrollView style={{ backgroundColor: '#000' }}>
                    <View style={{

                        height: Metrics.screenHeight * 0.45,
                        width: Metrics.screenWidth,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        // position: 'absolute',
                        // top: 0,
                        // zIndex: -1
                    }}>{(route?.params?.profileId ? route?.params?.profileId == userData?.id : true) && <TouchableOpacity style={{
                        alignSelf: 'flex-end',
                        // marginRight:Metrics.ratio(25),
                        position: 'absolute',
                        top: Metrics.ratio(40),
                        right: Metrics.ratio(25),
                        zIndex: 111,
                        backgroundColor:'rgba(0,0,0,0.1)',
                        height: Metrics.ratio(28),
                        width: Metrics.ratio(28),
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius: Metrics.ratio(28)
                    }}
                        onPress={() => setOptionModalVisible(true)}><Icons.Entypo name={'dots-three-vertical'} color={'#fff'} size={Metrics.ratio(20)} />
                    </TouchableOpacity>
                        }

                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={optionModalVisible}
                            onRequestClose={() => {
                                //   Alert.alert("Modal has been closed.");
                                setOptionModalVisible(!optionModalVisible);
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{
                                    backgroundColor: '#fff',
                                    height: Metrics.screenHeight * 0.52,
                                    width: Metrics.screenWidth * 0.8,
                                    borderRadius: Metrics.ratio(11),
                                }} >
                                    <TouchableOpacity onPress={() => setOptionModalVisible(!optionModalVisible)}>
                                        <Icons.Entypo style={{ alignSelf: 'flex-end', marginTop: Metrics.ratio(10), marginHorizontal: Metrics.ratio(10) }} name={'cross'} color={'#000'} size={Metrics.ratio(20)} />
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'space-between', flex: 1, paddingVertical: Metrics.ratio(20), paddingLeft: Metrics.ratio(70) }}>
                                        <TouchableOpacity onPress={() => (setOptionModalVisible(!optionModalVisible), navigation.navigate('Edit'))}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'Edit Profile'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => (setOptionModalVisible(!optionModalVisible), onShare())}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'Share Profile on social media '}
                                            />
                                        </TouchableOpacity>
                                        {/* <CustomText
                                            style={{
                                                alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                            }}
                                            fontSize={Metrics.ratio(14)}
                                            color='rgba(72, 77, 84, 1)'
                                            fontWeight='normal'
                                            title={'My Votes Bucket '}
                                        /> */}
                                        <TouchableOpacity onPress={() => (setOptionModalVisible(!optionModalVisible), navigation.navigate('FAQs'))}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'FAQs'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => (setOptionModalVisible(!optionModalVisible), navigation.navigate('HowItWorks'))}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'How it works '}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => (setOptionModalVisible(!optionModalVisible), navigation.navigate('Contact'))}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'Contact us '}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => (setOptionModalVisible(!optionModalVisible), navigation.navigate('Terms'))}
                                        >
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'Terms & Conditions'}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => logout()}>
                                            <CustomText
                                                style={{
                                                    alignSelf: 'center', marginTop: Metrics.ratio(15), width: Metrics.screenWidth * 0.8,
                                                }}
                                                fontSize={Metrics.ratio(14)}
                                                color='rgba(72, 77, 84, 1)'
                                                fontWeight='normal'
                                                title={'Logout'}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Image style={{
                            height: Metrics.screenHeight * 0.45,
                        }}
                            source={user?.social_profile_image ? { uri: `https://arabiansuperstar.org/public/${user?.social_profile_image}` } : require('../../assets/images/profile.png')}
                            resizeMode='cover'
                            width={Metrics.screenWidth}
                        />
                    </View>

                    <View style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: Metrics.ratio(30),
                        borderTopRightRadius: Metrics.ratio(30),
                        overflow: 'hidden',
                        flex: 1,
                        marginTop: -Metrics.ratio(30),
                        elevation: Metrics.ratio(10),
                    }} >

                        <View style={{ flexDirection: 'row', width: Metrics.screenWidth, justifyContent: 'space-evenly' }}>
                            {TopButtonSection.map((item, index) => {
                                return <View style={{ alignItems: 'center' }}>
                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(15),
                                        }}
                                        fontSize={Metrics.ratio(16)}
                                        color='#000'
                                        fontWeight='bold'
                                        title={item.amount}
                                    />
                                    <CustomText
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(5), marginBottom: Metrics.ratio(10),
                                        }}
                                        fontSize={Metrics.ratio(14)}
                                        color='#9A9EA4'
                                        fontWeight='bold'
                                        title={item.title}
                                    />
                                    <TouchableOpacity
                                        onPress={item.onPress}
                                        disabled={item.isDisabled}
                                    >
                                        {index === 3 ? user?.rating === '0.00' ? <Image style={{
                                            height: Metrics.ratio(40),
                                            width: Metrics.ratio(40),
                                            tintColor: item.color
                                        }}
                                            source={require(`../../assets/images/star.png`)}
                                            resizeMode='contain'
                                        /> : <WithLocalSvg asset={item.icon} /> :
                                            <Image style={{
                                                height: Metrics.ratio(40),
                                                width: Metrics.ratio(40),
                                                tintColor: item.color
                                            }}
                                                source={item.icon}
                                                resizeMode='contain'
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                            })}

                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={ratingModalVisible}
                                onRequestClose={() => {
                                    //   Alert.alert("Modal has been closed.");
                                    setRatingModalVisible(!ratingModalVisible);
                                }}
                            >
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        height: Metrics.screenHeight * 0.25,
                                        width: Metrics.screenWidth * 0.8,
                                        borderRadius: Metrics.ratio(11),
                                    }} >
                                        <TouchableOpacity onPress={() => setRatingModalVisible(!ratingModalVisible)}>
                                            <Icons.Entypo style={{ alignSelf: 'flex-end', marginTop: Metrics.ratio(10), marginHorizontal: Metrics.ratio(10) }} name={'cross'} color={'#000'} size={Metrics.ratio(20)} />
                                        </TouchableOpacity>
                                        <View style={{ width: Metrics.screenWidth * 0.65, alignSelf: 'center' }}>

                                            <CustomText
                                                style={{
                                                    // width: Metrics.screenWidth * 0.8,
                                                    // alignSelf: 'center', marginTop: Metrics.ratio(15),
                                                }}
                                                fontSize={Metrics.ratio(20)}
                                                color='#707070'
                                                fontWeight='normal'
                                                title={'Rating'}
                                            />

                                            <View style={{ flexDirection: 'row', marginTop: Metrics.ratio(15), justifyContent: 'space-between' }}>
                                                {[1, 1, 1, 1, 5].map((item, index) => {
                                                    return <TouchableOpacity onPress={() => { setStars(index + 1) }}>
                                                        <Image style={{
                                                            height: Metrics.ratio(40),
                                                            width: Metrics.ratio(40)
                                                        }}
                                                            // source={require(`../../assets/images/${'redstar.png'}`)}
                                                            source={(stars && stars >= index + 1) ? require(`../../assets/images/redstar.png`) : require(`../../assets/images/star.png`)}
                                                            resizeMode='contain'
                                                        />
                                                    </TouchableOpacity>
                                                })}

                                            </View>
                                            <Button
                                                onPress={() => (setRatingModalVisible(!ratingModalVisible), addRating())}
                                                height={Metrics.ratio(38)}
                                                width={Metrics.screenWidth * 0.48}
                                                fontSize={Metrics.ratio(11)}
                                                title='SUBMIT'
                                                style={{ alignSelf: 'center', marginTop: Metrics.ratio(20), marginBottom: Metrics.ratio(20) }}
                                                radius={Metrics.ratio(11)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>

                        <View style={{ borderWidth: 0.25, borderColor: '#707070', width: Metrics.screenWidth * 0.8, marginTop: Metrics.ratio(30), alignSelf: 'center' }} />


                        <View style={{ flexDirection: 'row', width: Metrics.screenWidth * 0.8, alignSelf: 'center', justifyContent: 'space-between' }}>
                            <CustomText
                                style={{
                                    // width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center', marginTop: Metrics.ratio(15),
                                }}
                                fontSize={Metrics.ratio(16)}
                                color='#000'
                                fontWeight='bold'
                                title={user?.full_name}
                            />
                            <View style={{ flexDirection: 'row', }}>
                                <Icons.MaterialIcons name={'location-on'} color={'black'} size={Metrics.ratio(15)} style={{ marginTop: Metrics.ratio(18), }} />
                                <CustomText
                                    style={{
                                        // width: Metrics.screenWidth * 0.8,
                                        alignSelf: 'center', marginTop: Metrics.ratio(15),
                                    }}
                                    fontSize={Metrics.ratio(14)}
                                    color='#000'
                                    fontWeight='bold'
                                    title={user?.country_of_residence}
                                />
                            </View>
                        </View>

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(5),
                            }}
                            fontSize={Metrics.ratio(14)}
                            color='#000'
                            fontWeight='normal'
                            title={user?.username}
                        />

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#484D54'
                            fontWeight='bold'
                            title={'My Profile'}
                        />

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(13)}
                            color='rgba(0, 0, 0, 0.5)'
                            fontWeight='normal'
                            title={user?.bio}
                        />

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#484D54'
                            fontWeight='bold'
                            title={'Nominations'}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center',
                            flexWrap: 'wrap',
                            marginTop: Metrics.ratio(20),
                        }} >
                            {user?.nominities?.map((item, index) => {
                                return (
                                    item?.active && <Button
                                        onPress={() => null}
                                        height={Metrics.ratio(40)}
                                        fontSize={Metrics.ratio(14)}
                                        title={item?.title}
                                        style={{
                                            alignSelf: 'center', marginTop: Metrics.ratio(5), marginBottom: Metrics.ratio(5), paddingHorizontal: Metrics.ratio(20),
                                            marginRight: Metrics.ratio(5)
                                        }}
                                        radius={Metrics.ratio(11)}
                                        disabled={true}
                                    // border={(index === 0)? false : (index === 3)? false : true}
                                    />
                                )
                            })}


                        </View>


                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#484D54'
                            fontWeight='bold'
                            title={'Photos'}
                        />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: Metrics.ratio(20) }}>
                            {user?.geller_images?.map((item, index) => {
                                return <TouchableOpacity  onPress={() => setModalVisible(true)}>
                                    <Image style={{

                                        height: Metrics.screenHeight * 0.2,
                                        width: Metrics.screenWidth / 3,
                                        // alignSelf: 'center',
                                        // marginTop: Metrics.ratio(20),
                                        borderWidth: 1,
                                        borderColor: '#fff'
                                    }}
                                        source={{ uri: `https://arabiansuperstar.org/public/${item?.imagepath}/${item?.image}` }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            })}

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
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Icons.Entypo style={{ alignSelf: 'flex-end', }} name={'cross'} color={'#fff'} size={Metrics.ratio(40)} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <ScrollView horizontal>
                                        {user?.geller_images?.map((item, index) => {
                                            return <View >
                                                <View style={{
                                                    height: Metrics.ratio(20),
                                                    width: Metrics.ratio(40),
                                                    backgroundColor: 'rgba(24, 24, 24, 0.36)',
                                                    borderRadius: Metrics.ratio(10),
                                                    position: 'absolute',
                                                    zIndex: 99,
                                                    top: 10,
                                                    right: 10,
                                                    justifyContent: 'center',
                                                }}>
                                                    <CustomText
                                                        style={{
                                                            alignSelf: 'center',
                                                            color: '',
                                                        }}
                                                        fontSize={Metrics.ratio(11)}
                                                        color='#fff'
                                                        fontWeight='normal'
                                                        title={`${index + 1}/${user?.geller_images?.length}`}
                                                    />

                                                </View>
                                                <Image style={{

                                                    height: Metrics.screenHeight / 2,
                                                    width: Metrics.screenWidth,
                                                    // alignSelf: 'center',
                                                    borderWidth: 1,
                                                    borderColor: '#fff'
                                                }}
                                                    source={{ uri: `https://arabiansuperstar.org/public/${item?.imagepath}/${item?.image}` }}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        })}

                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>


                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#484D54'
                            fontWeight='bold'
                            title={'Video'}
                        />
                        <TouchableOpacity onPress={() => setVideoModalVisible(true)} style={{

                            height: Metrics.screenHeight * 0.4,
                            width: Metrics.screenWidth,
                            // alignSelf: 'center',
                            marginTop: Metrics.ratio(20),
                            borderWidth: 1,
                            borderColor: '#fff'
                        }}>
                            {/* <Video source={{ uri: `https://arabiansuperstar.org/public/${user?.video_path}` }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode='cover'
                                paused={isPaused}
                                muted={true}
                            /> */}
                            <Image style={{ width: '100%', height: '100%' }}
                                source={require('../../assets/images/video-placeholder.png')}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>


                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={videoModalVisible}
                            onRequestClose={() => {
                                //   Alert.alert("Modal has been closed.");
                                setVideoModalVisible(!videoModalVisible);
                            }}
                        >
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'row' }}><View >
                                    <TouchableOpacity
                                        onPress={() => setIsPaused(!isPaused)}
                                        style={{

                                            height: Metrics.screenHeight / 2,
                                            width: Metrics.screenWidth,
                                            // alignSelf: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff'
                                        }}>
                                        {isPaused ? <Image style={{ width: '100%', height: '100%' }}
                                            source={require('../../assets/images/video-placeholder.png')}
                                            resizeMode='cover'
                                        /> :
                                            <Video source={{ uri: `https://arabiansuperstar.org/public/${user?.video_path}` }} style={{ width: '100%', height: '100%' }} resizeMode='cover' paused={isPaused} muted={true} />}
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>
                        </Modal>

                        <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(20),
                            }}
                            fontSize={Metrics.ratio(16)}
                            color='#484D54'
                            fontWeight='bold'
                            title={'Share Profile'}
                        />
                        <TouchableOpacity onPress={onShare}>
                            <Image style={{

                                height: Metrics.screenHeight * 0.045,
                                width: Metrics.screenWidth * 0.8,
                                // alignSelf: 'center',
                                marginTop: Metrics.ratio(20)
                            }}
                                source={require('../../assets/images/share.png')}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

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
        </Footer>
    )
}
