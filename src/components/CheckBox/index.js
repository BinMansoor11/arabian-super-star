import React, { useRef, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import styles from './styles';


export default function CheckBox(props) {
    const {
        children,
        one,
        two,
        text,
        oneText,
        twoText,
        style
    } = props
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    return (
        <View style={{ ...style, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
                style={styles.checkbox}>
                {toggleCheckBox && (
                    <Icons.Feather
                        name="check"
                        color="#707070"
                        size={Metrics.ratio(13)}
                    />
                )}
            </TouchableOpacity>
            <Text style={{
                color: '#D6324A',
                fontWeight: 'bold',
                fontSize: Metrics.ratio(16),
                textAlign: 'center'
            }}>
                {text}
            </Text>
            {one &&
                <TouchableOpacity style={{
                    marginLeft: Metrics.ratio(12),
                    borderRadius: Metrics.ratio(3),
                    borderColor: '#707070',
                    borderWidth: Metrics.ratio(1),
                    height: Metrics.ratio(15),
                    width: Metrics.ratio(65),
                    paddingHorizontal: Metrics.ratio(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: '#D6324A',
                        fontSize: Metrics.ratio(11),
                    }}>{oneText}</Text>
                    <Icons.AntDesign
                        name="caretdown"
                        color="#D6324A"
                        size={Metrics.ratio(10)}
                    />
                </TouchableOpacity>
            }
            {two &&
                <TouchableOpacity style={{
                    marginLeft: Metrics.ratio(12),
                    borderRadius: Metrics.ratio(3),
                    borderColor: '#707070',
                    borderWidth: Metrics.ratio(1),
                    height: Metrics.ratio(15),
                    width: Metrics.ratio(65),
                    paddingHorizontal: Metrics.ratio(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: '#D6324A',
                        fontSize: Metrics.ratio(11),
                    }}>{twoText}</Text>
                    <Icons.AntDesign
                        name="caretdown"
                        color="#D6324A"
                        size={Metrics.ratio(10)}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}
