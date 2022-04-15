import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts } from '../../theme';
// import styles from './styles';


export function CustomText(props) {

    const {
        title,
        color,
        fontSize,
        fontWeight,
        style
    } = props

    return (

        <Text style={{
            ...style,
            color: color ? color : Colors.text.primary,
            fontSize: fontSize ? fontSize : Metrics.ratio(14),
            fontWeight: fontWeight ? fontWeight : 'normal'
        }}>{title}</Text>

    )
}
