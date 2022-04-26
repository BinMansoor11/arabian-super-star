import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import axios from 'axios';




export default function Contact({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')




    const contact = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/send_inquiry',
            {name, email, phone, message},
            { headers: { "Content-Type": "application/json" } });
            console.log({contact:response?.data})
if(response?.data.status === 'success'){
    setIsLoading(false)
    alert('Your message has been sent successfully')
}else{
    setIsLoading(false)
    alert('Something went wrong')
}
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
            alert('Something went wrong')
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <ActivityIndicator
        isLoading={true}
        size="large"
      />}
            {/* <TouchableOpacity
                onPress={() => navigation.goBack()}
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

            </TouchableOpacity> */}
            <ScrollView>
                <View style={{ height: Metrics.screenHeight * 0.8 }}>
                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(30),
                        }}
                        fontSize={Metrics.ratio(23)}
                        color='#000'
                        fontWeight='bold'
                        title={'Contact Us'}
                    />


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(50),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Full Name'}
                    />


                    <View style={{
                        height: Metrics.ratio(40),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput 
                        onChangeText={(text) => setName(text)}
                        style={{ color: '#000', fontSize: Metrics.ratio(11), height: '100%' }}
                        />
                    </View>


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(20),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Email Address'}
                    />




                    <View style={{
                        height: Metrics.ratio(40),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput 
                        onChangeText={(text) => setEmail(text)}
                        style={{ color: '#000', fontSize: Metrics.ratio(11), height: '100%' }}
                        />
                    </View>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(20),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Phone Number'}
                    />




                    <View style={{
                        height: Metrics.ratio(40),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput 
                        onChangeText={(text) => setPhone(text)}
                        style={{ color: '#000', fontSize: Metrics.ratio(11), height: '100%' }}
                        />
                    </View>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(20),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Message'}
                    />




                    <View style={{
                        height: Metrics.ratio(120),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                        alignItems:'flex-start'
                    }}>
                         <TextInput 
                        //  value={about} 
                         onChangeText={(text) => setMessage(text)} 
                         multiline={true} 
                         textAlignVertical='top' 
                         style={{ color: '#000', fontSize: Metrics.ratio(11), height: '100%' }} 
                         placeholder='(155 characters)' 
                         placeholderTextColor={'rgba(0, 0, 0, 0.5)'} />
                    </View>

                </View>
                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>

                    <Button
                        onPress={() => contact()}
                        height={Metrics.ratio(50)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='Contact'
                        style={{ position: 'absolute', bottom: Metrics.ratio(40), alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(90) }}
                        radius={Metrics.ratio(11)}
                    />



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
