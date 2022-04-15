import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import styles from './styles';


export function Header(props) {
    const {
        heading
    } = props
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.left}>
                <Icons.Octicons name='three-bars' color='#fff' size={Metrics.ratio(35)} />
            </TouchableOpacity>



            <View style={styles.body}>
                <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: Metrics.ratio(20) }}>{heading}</Text>
            </View>



            <TouchableOpacity style={styles.right}>
                <Icons.Entypo name='cog' color='#fff' size={Metrics.ratio(35)} />
            </TouchableOpacity>
        </View>
    )
}
