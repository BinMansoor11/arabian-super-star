import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts } from '../../theme';
// import styles from './styles';


export function VenueCard(props) {
    const {
        height,
        width
    } = props
    return (
        <TouchableOpacity style={{
            height: height ? height : Metrics.screenHeight * 0.22,
            width: width ? width : Metrics.screenWidth * 0.33,
            borderRadius: Metrics.ratio(12),
            overflow: 'hidden',
            elevation: 3,
            backgroundColor: '#fff'
        }}>

            <Image
                source={require('../../assets/images/beach.jpg')}
                resizeMode='cover'
                style={{ height: '100%', width: '100%', flex: 1, }}
            />
            <View style={{ flex: 0.6, paddingHorizontal: Metrics.ratio(5) }}>

                <Text style={{
                    color: 'rgba(64, 64, 64, 1)',
                    fontSize: Metrics.ratio(12),
                    fontWeight: 'bold',
                    marginVertical: Metrics.ratio(5),
                }}>Sonmiani Beach</Text>

                <Text style={{
                    color: '#9E9B9B',
                    fontSize: Metrics.ratio(9),
                    marginTop: Metrics.ratio(5),
                    marginBottom: Metrics.ratio(3),
                }}>7 Room - 30 Guests</Text>

                <Text style={{
                    color: '#9E9B9B',
                    fontSize: Metrics.ratio(9),
                    marginBottom: Metrics.ratio(5),
                }}>13 - 18 Nov</Text>
            </View>

        </TouchableOpacity>
    )
}
