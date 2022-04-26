import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts } from '../../theme';
// import styles from './styles';


export function CustomTextInput(props) {
    const [show, setShow] =useState(false);
    const {
        placeholder,
        customStyle,
        rightButton,
        disabled,
        onChangeText, 
        value, 
        maxLength,
    } = props

    return (
        <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <TextInput
                style={{ ...customStyle, color: Colors.text.primary, }}
                underlineColorAndroid={'rgba(46, 46, 46, 0.4)'}
                placeholder={placeholder ? placeholder : 'Enter Text Here'}
                placeholderTextColor={'rgba(46, 46, 46, 0.4)'}
                editable={!disabled}
                onChangeText={(text) => onChangeText(text)}
                secureTextEntry={rightButton ? !show : false}
                value={value}
                maxLength={maxLength}
            />
            {rightButton &&
                <TouchableOpacity onPress={()=> setShow(!show)} style={{marginLeft:-Metrics.ratio(40)}}>
                    <Text style={{color:'rgba(46, 46, 46, 0.7)', fontSize:12, fontWeight:'bold'}}>{show ? 'Hide': 'Show'}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
