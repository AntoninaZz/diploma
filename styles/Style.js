import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { gap } from '../constants/constants';
import { Dimensions } from 'react-native';

const vw = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.lightvanilla,
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.45 * vw,
        height: 0.45 * vw,
        backgroundColor: COLORS.vanilla,
        borderWidth: 1,
        borderColor: COLORS.darkgreen,
        borderRadius: 10,
        marginTop: gap,
    },
    image: {
        width: 0.8 * 0.45 * vw,
        height: 0.8 * 0.45 * vw,
        resizeMode: 'contain',
    },
    bigImage: {
        width: 0.65 * vw,
        height: 0.65 * vw,
        resizeMode: 'contain',
    },
    title: {
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    bigTitle: {
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: COLORS.darkgreen,
        borderTopWidth: 1,
        borderTopColor: COLORS.darkgreen,
        paddingTop: gap,
    },
    calcTitle: {
        marginBottom: 2 * gap,
    },
    label: {
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: gap,
    },
    text: {
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        fontSize: 12,
        textAlign: 'justify',
    },
    block: {
        width: 0.8 * vw,
        marginBottom: 2 * gap,
    },
    table: {
        gap: gap,
    },
    tr: {
        width: 0.8 * vw,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.brown,
        borderBottomWidth: 1,
        borderStyle: 'dotted',
    },
    button: {
        padding: gap,
        backgroundColor: COLORS.darkgreen,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
    },
    buttonLabel: {
        color: COLORS.vanilla,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    search: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    nameSearch: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.9 * vw,
        marginTop: gap,
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 12,
        marginBottom: 3 * gap,
    },
    input: {
        padding: gap,
        backgroundColor: COLORS.white,
        borderRadius: gap,
        width: 0.25 * vw,
        marginTop: gap,
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 24,
        textAlign: 'right',
    },
    line: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    formText: {
        color: COLORS.darkgreen,
        fontFamily: 'Montserrat',
        fontSize: 12,
    },
    formTextGap: {
        marginLeft: gap,
        marginTop: 2 * gap,
    },
    startSpace: {
        marginTop: gap,
    },
    checkBoxLabel: {
        marginLeft: gap,
    },
    radioLabel: {
        fontWeight: 'bold',
        color: COLORS.darkgreen,
    },
    checkContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: gap,
        marginTop: gap,
    },
    checkWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkContainerGap: {
        marginTop: gap,
        marginLeft: 3 * gap,
    },
    tag: {
        color: COLORS.brown,
        fontFamily: 'Montserrat',
        fontSize: 12,
        padding: 0.5 * gap,
        paddingLeft: gap,
        position: 'absolute',
        right: 0,
        top: gap,
        clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0 50%)',
    },
    percentTag: {
        backgroundColor: COLORS.aqua,
    },
    bigLipTag: {
        backgroundColor: COLORS.lightpink,
    },
    aromaTag: {
        backgroundColor: COLORS.blue,
    },
    miniTag: {
        backgroundColor: COLORS.lightgreen,
    },
    multiTag: {
        backgroundColor: COLORS.purple,
    },
    searchContainer: {
        width: 0.9 * vw,
        margin: 'auto',
        paddingBottom: 2 * gap,
    },
});

export default styles;