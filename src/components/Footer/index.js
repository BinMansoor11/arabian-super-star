import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, BackHandler, Alert } from 'react-native';
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useKeyboardStatus } from '../KeyboardStatus';


export function Footer(props) {
    const { children } = props
    const navigation = useNavigation();
    const route = useRoute();
    
    console.log({route})
  const [isOpen] = useKeyboardStatus();

  const backAction = () => {
    // Alert.alert("Hold on!", "Are you sure you want to Exit?", [
    //   {
    //     text: "Cancel",
    //     onPress: () => null,
    //     style: "cancel"
    //   },
    //   { text: "YES", onPress: () => BackHandler.exitApp() }
    // ]);
    (route?.name === 'Home' || route?.name === 'MyTabs') ? BackHandler.exitApp() : navigation?.goBack();
    return true;
  };



  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);

  }, [isOpen]);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {children}
            {isOpen ? null :
            <View style={styles.container}>
                <TouchableOpacity style={styles.left}>
                    <Icons.AntDesign onPress={() => navigation.navigate('Home')} name='home' color={route?.name === 'Home' ? '#CC2D3A' : 'gray'} size={Metrics.ratio(35)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyTabs')} style={styles.left}>
                    <Icons.Entypo name='user' color={route?.name === 'MyTabs' ? '#CC2D3A' : 'gray'} size={Metrics.ratio(35)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyVotes')} style={styles.left}>
                {/* <Image source={require('../../assets/images/vote.png')} resizeMode='contain' height={Metrics.ratio(25)} width={Metrics.ratio(25)} /> */}
                    <Icons.MaterialCommunityIcons name='vote' color={route?.name === 'MyVotes' ? '#CC2D3A' : 'gray'} size={Metrics.ratio(35)} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Notifications')} style={styles.left}>
                    <Icons.MaterialIcons name='notifications-none' color={route?.name === 'Notifications' ? '#CC2D3A' : 'gray'} size={Metrics.ratio(35)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.left}>
                    <Icons.AntDesign name='search1' color={route?.name === 'Search' ? '#CC2D3A' : 'gray'} size={Metrics.ratio(35)} />
                </TouchableOpacity>



            </View>}
        </View>
    )
}
