import React, { } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './BottomTab';
import {
    Login,
    SignUp,
    SignUpOne,
    SignUpTwo,
    SignUpThree,
    SignUpFour,
    ResetPassword,
    VerifyCode,
    NewPassword,
    Confirm,
    Profile,
    MyVotes,
    Home,
    Edit,
    Packs,
    PaymentMethod,
    Comments,
    Notifications,
    Search,
    FAQs,
    Terms,
    HowItWorks,
    Contact,
} from '../containers'
import { useDispatch, useSelector } from 'react-redux';
const Stack = createStackNavigator();

export default function StackNavigator() {
    const { isLoggedIn } = useSelector(state => state.root);
    return (
        // <Stack.Navigator headerMode="none" initialRouteName={"Login"} >
        <Stack.Navigator headerMode="none" initialRouteName={isLoggedIn ? 'MyTabs':"Login"} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUpOne" component={SignUpOne} />
            <Stack.Screen name="SignUpTwo" component={SignUpTwo} />
            <Stack.Screen name="SignUpThree" component={SignUpThree} />
            <Stack.Screen name="SignUpFour" component={SignUpFour} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="VerifyCode" component={VerifyCode} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
            <Stack.Screen name="MyVotes" component={MyVotes} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Packs" component={Packs} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="FAQs" component={FAQs} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="HowItWorks" component={HowItWorks} />
            <Stack.Screen name="Contact" component={Contact} />

        </Stack.Navigator>
    );
}