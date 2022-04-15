import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Metrics, Colors, Images, Fonts, Icons } from '../theme';
import { Profile, } from '../containers'


const Tab = createBottomTabNavigator();


const Feed = () => {
    return <View style={{flex: 1, backgroundColor:'#fff'}} />
}

const Notifications = () => {
    return <View />
}

// const Profile = () => {
//     return <View />
// }


function MyTabs() {
  return (
    <Profile />
    // <Tab.Navigator
    //   initialRouteName="Feed"
    //   screenOptions={{
    //     tabBarActiveTintColor: '#e91e63',
    //     tabBarInactiveTintColor: 'gray',
    //   }}
    // >
    //   <Tab.Screen
    //     name="Feed"
    //     component={Feed}
    //     options={{
    //       tabBarLabel: 'Home',
    //       tabBarIcon: ({ color, size }) => (
    //         <Icons.MaterialCommunityIcons name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Notifications"
    //     component={Notifications}
    //     options={{
    //       tabBarLabel: 'Updates',
    //       tabBarIcon: ({ color, size }) => (
    //         <Icons.MaterialCommunityIcons name="bell" color={color} size={size} />
    //       ),
    //       tabBarBadge: 3,
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       tabBarLabel: 'Profile',
    //       tabBarIcon: ({ color, size }) => (
    //         <Icons.MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
  );
}

export default MyTabs;