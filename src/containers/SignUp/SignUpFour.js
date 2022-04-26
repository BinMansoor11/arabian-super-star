import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
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
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';

import { useDispatch, useSelector } from 'react-redux';



const options = {
    title: 'select an option',
    mediaType: 'video',
}

export default function SignUpFour({ navigation }) {
    const dispatch = useDispatch();
    const { image_gallery, bio, video_path } = useSelector(state => state.root);
    const [images, setImages] = useState(image_gallery?.length === 0 ? [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] : image_gallery);
    const [video, setVideo] = useState(video_path === '' ? null : video_path?.uri);
    const [about, setAbout] = useState(bio === '' ? null : bio)
    const [isPaused, setIsPaused] = useState(false)
    const [sendImages, setSendImages] = useState(null)
    const [sendVideo, setSendVideo] = useState(null)


    const getPictures = (index) => {
        var imgs = []
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 21,
        }).then(image => {
        console.log({image})

         image.forEach(async item => {
                const res = await RNFS.readFile(item?.path, 'base64');
                imgs.push({
                    uri: item?.path,
                    type: 'image/jpeg',
                    name: 'filename',
                    data: res
                });
                imgs?.length === image.length &&   setSendImages(imgs);
            })
        });
  
     
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

    const handleErrors = () => {
        if (about !== '') {
            //   return true;
            if(sendImages?.length < 22){

                dispatch({ type: 'bio', payload: about })
                dispatch({ type: 'image_gallery', payload: sendImages })
                dispatch({ type: 'video_path', payload: sendVideo })
                navigation.navigate('Confirm')
            }else{
                alert('You can only upload 21 images')
            }

        } else {
            alert('Please fill all the fields')
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: Metrics.screenHeight * 0.79 }}>
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

                <ScrollView>
                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(50),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'About Me'}
                    />


                    <View style={{
                        // height: Metrics.ratio(50),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        height: Metrics.screenHeight * 0.15,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput value={about} multiline={true} maxLength={100} textAlignVertical='top' onChangeText={(text) => setAbout(text)} style={{ color: '#000', fontSize: Metrics.ratio(11), height: '100%' }} placeholder='(100 characters)' placeholderTextColor={'rgba(0, 0, 0, 0.5)'} />
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
                        // flexWrap: 'wrap',
                        // height: Metrics.screenHeight * 0.2,
                        // marginBottom: Metrics.ratio(50),
                    }} >
                        <TouchableOpacity
                            onPress={() => getPictures()}
                            style={{
                                height: Metrics.screenHeight * 0.15,
                                width: Metrics.screenHeight * 0.15,
                                borderWidth: Metrics.ratio(1),
                                borderRadius: Metrics.ratio(11),
                                borderColor: '#CC2D3A',
                                // marginBottom: Metrics.ratio(20),
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                            {sendImages && sendImages[0]?.uri ? <Image style={{ height: '100%', width: '100%', }} source={{ uri: sendImages[0]?.uri }} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />
                            }
                        </TouchableOpacity>
                       <CustomText
                            style={{
                                width: Metrics.screenWidth * 0.5,
                                alignSelf: 'center',
                                marginLeft:20,
                                // backgroundColor:'red'
                                // marginTop: Metrics.ratio(10),
                                // marginVertical: Metrics.ratio(15),
                            }}
                            fontSize={Metrics.ratio(14)}
                            color='#000'
                            fontWeight='normal'
                            title={`${sendImages ? sendImages?.length : '0'} Photos Selected`}
                        />
                        {/* {images?.map((item, index) => {
                            return (
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
                                    }}>
                                    {item?.uri ? <Image style={{ height: '100%', width: '100%', }} source={{ uri: item?.uri }} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />
                                    }
                                </TouchableOpacity>
                            )
                        })} */}
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
                        onPress={() => video === null ? getVideo() : setIsPaused(!isPaused)}
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
                        {video ? <Video source={{ uri: video }} style={{ width: '100%', height: '100%' }} resizeMode='cover' paused={isPaused} muted={true} /> : <Icons.FontAwesome name='camera' size={Metrics.ratio(20)} color='#CC2D3A' />}
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.21 }}>

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
        </View>
    )
}
