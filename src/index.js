import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    Separator,
    CustomTextInput,
    VenueCard,
    Footer,
    CheckBox
} from './components'
import { Metrics, Colors, Images, Fonts } from './theme';

import {
    Login,
    SignUp,
    BankDetail,
    Dashboard,
    PendingBookings,
} from './containers'

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation'



export default function App() {
    return (
        // <Login />
        // <SignUp />
        // <BankDetail />
        // <Dashboard />
        // <PendingBookings />
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
