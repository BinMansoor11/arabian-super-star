import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';


export default StyleSheet.create({
    checkbox: {
        height: Metrics.ratio(15),
        width: Metrics.ratio(15),
        borderWidth: 1,
        borderRadius:15,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Metrics.ratio(10),
    },
});
