import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    Separator,
    CustomTextInput,
    VenueCard,
    Footer,
    CheckBox,
    ActivityIndicator
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function MyVotes({ navigation, route }) {
    const isFocused = useIsFocused();
    const { userData } = useSelector(state => state.root);
    const [isLoading, setIsLoading] = useState(true)
    const [bucketData, setBucketData] = useState(true)


    console.log({ userData })


    const voteBucket = async () => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/vote_bucket',
            {userid:userData?.id},
            { headers: { "Content-Type": "application/json" } });
            console.log({voteBucket:response?.data})
            setBucketData(response?.data?.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
    }


    const addVote = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/add_vote',
            {userid:bucketData?.id, profile_id:bucketData?.id, country:bucketData?.country_of_residence},
            { headers: { "Content-Type": "application/json" } });
            console.log({Vote:response?.data, bucketData})

            const duplicate = {...bucketData}
            duplicate.avilable_votes = JSON.parse(bucketData?.avilable_votes) + 1
            duplicate.vote_bucket = JSON.parse(bucketData?.vote_bucket) - 1
            setBucketData(duplicate)

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
    }


    useEffect(() => {
        voteBucket()
    },[isFocused])


    return (
        <Footer>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
                <ScrollView style={{ backgroundColor: '#fff' }}>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.4,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(65),
                            textAlign: 'center',
                        }}
                        fontSize={Metrics.ratio(35)}
                        color='#000'
                        fontWeight='bold'
                        title={'My Votes Bucket'}
                    />

                    <View style={{

                        height: Metrics.screenHeight * 0.2,
                        width: Metrics.screenHeight * 0.2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: Metrics.ratio(999),
                        overflow: 'hidden',
                        backgroundColor: '#000',
                        marginTop: Metrics.ratio(30),
                    }}>

                        <Image style={{
                            height: Metrics.screenHeight * 0.2,
                            width: Metrics.screenHeight * 0.2,
                        }}
                            source={{ uri: `https://arabiansuperstar.org/public/${bucketData?.social_profile_image}` }}
                            resizeMode='cover'
                        />
                    </View>

                    <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(15),
                        }}
                        fontSize={Metrics.ratio(16)}
                        color='#000'
                        fontWeight='bold'
                        title={bucketData?.full_name}
                    />

                    <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(5),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={bucketData?.username}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                        <Icons.MaterialIcons name={'location-on'} color={'black'} size={Metrics.ratio(15)} style={{ marginTop: Metrics.ratio(8), }} />
                        <CustomText
                            style={{
                                // width: Metrics.screenWidth * 0.8,
                                alignSelf: 'center', marginTop: Metrics.ratio(5),
                            }}
                            fontSize={Metrics.ratio(14)}
                            color='#000'
                            fontWeight='bold'
                            title={bucketData?.country_of_residence}
                        />
                    </View>



                    <Icons.MaterialCommunityIcons name={'vote'} color={'black'} size={Metrics.ratio(40)} style={{ alignSelf: 'center', marginTop: Metrics.ratio(20) }} />

                    <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(16)}
                        color='#000'
                        fontWeight='bold'
                        title={'Available Votes'}
                    />
                   <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={bucketData?.vote_bucket}
                    />

                    <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(16)}
                        color='#000'
                        fontWeight='bold'
                        title={'My Votes'}
                    />
                     <CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={bucketData?.avilable_votes}
                    />



<Button
                    onPress={() => addVote()}
                    height={Metrics.ratio(40)}
                    width={Metrics.screenWidth * 0.25}
                    fontSize={Metrics.ratio(15)}
                    title='Vote Me'
                    style={{ alignSelf: 'center', marginVertical: Metrics.ratio(10),}}
                    radius={Metrics.ratio(11)}
                    disabled ={bucketData?.avilable_votes > 0 ? false:true}
                />

                    <TouchableOpacity onPress={() => navigation.navigate('Packs')} ><CustomText
                        style={{
                            // width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginVertical: Metrics.ratio(30),
                        }}
                        fontSize={Metrics.ratio(16)}
                        color='#000'
                        fontWeight='bold'
                        title={'Buy Vote'}
                    /></TouchableOpacity>


                    <Image style={{

                        height: Metrics.screenHeight * 0.07,
                        width: Metrics.screenWidth * 0.6,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10), bottom: 0
                    }}
                        source={require('../../assets/images/logo.png')}
                        resizeMode='stretch'
                    />
                </ScrollView>
            </View>
        </Footer>
    )
}
