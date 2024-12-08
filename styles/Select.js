import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { gap } from '../constants/constants';
import { Dimensions } from 'react-native';
const vw = Dimensions.get('window').width;

const selectStyles = StyleSheet.create({
    inputIOS: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 12,
        border: 'none',
    },
    inputAndroid: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 12,
        border: 'none',
        maxHeight: 5*gap,
    },
    inputWeb: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 12,
        border: 'none',
    },
});

export default selectStyles;