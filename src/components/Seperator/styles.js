import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';


export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        height: Metrics.ratio(55),
        borderBottomRightRadius: Metrics.ratio(20),
        borderBottomLeftRadius: Metrics.ratio(20),
    },

    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goBackImg: {
        width: Metrics.ratio(30),
        height: Metrics.ratio(30),
        alignSelf: 'flex-start',
        zIndex: 99,
    },
    body: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarInput: {
        fontFamily: Fonts.type.ArialItalic,
        fontSize: Fonts.size.xxxSmall,
        width: '90%',
        height: Metrics.ratio(38),
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightText: {
        fontSize: Fonts.size.ten,
        fontFamily: Fonts.type.Arial,
        position: 'absolute',
        right: Metrics.ratio(12),
        top: Metrics.ratio(9),
        color: '#3FA9F5',
    },
    imageCart: {
        width: Metrics.ratio(38),
        height: Metrics.ratio(34),
        // marginTop: Metrics.screenWidth * 0.016,
    },
    rounderIcon: {
        width: Metrics.ratio(45),
        height: Metrics.ratio(45),
    },
    profimeImage: {},
    inputViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    searchBar: {
        backgroundColor: 'white',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        shadowColor: '#000000',
        elevation: 3,
        marginRight: Metrics.screenWidth * 0.02,
    },
});
