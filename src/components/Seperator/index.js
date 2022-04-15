import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts } from '../../theme';
// import styles from './styles';


export function Separator(props) {

    const {
        width,
        color,
        height,
        align
    } = props

    return (

        <View style={{
            backgroundColor: color ? color : Colors.primary,
            // height: Metrics.ratio(1),
            borderWidth: height ? height : Metrics.ratio(0.5),
            borderColor: color ? color : Colors.primary,
            width: width ? width : Metrics.screenWidth * .8,
            marginVertical: Metrics.ratio(5),
            alignSelf: align ? align : 'center'
        }} />

    )
}
