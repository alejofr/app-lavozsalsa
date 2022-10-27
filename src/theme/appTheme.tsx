import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#FF0032',
    secundary: '#101316',
    default: '#000',
    white: '#fff',
    gris: '#6B6B6B',
    grisTwo: '#858585',
    grisSuaveOscuro: '#313131',
    opacoNegro: '#777777'
};

export const stylesGlobal = StyleSheet.create({
    alignItemsStart: { alignItems: 'flex-start' },
    alignItemsCenter: { alignItems: 'center' },
    alignItemsEnd: { alignItems: 'flex-end' },
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
    },
    bg0: { backgroundColor: colors.default },
    bg1: { backgroundColor: colors.secundary },
    dFlex: { display:'flex' },
    flex1: { flex: 1 },
    flex2: { flex: 2 },
    flex3: { flex: 3 },
    flexDirectionColumn: { flexDirection: 'column' },
    h100p: { height: '100%' },
    justifyContenStart: { justifyContent: 'flex-start' }, 
    justifyContenCenter: { justifyContent: 'center' },
    justifyContenSpaceAround: { justifyContent: 'space-around' },
    justifyContentSpaceBetween: {justifyContent: 'space-between'},
    justifyContenEnd: { justifyContent: 'flex-end' },
    mb8: { marginBottom: 8 },
    mb12: { marginBottom: 12 },
    mb15: { marginBottom: 15 },
    mb22: { marginBottom: 22 },
    mb25: { marginBottom: 25 },
    mt15: {marginTop: 15},
    mt25: {marginTop: 25},
    ml16: { marginLeft: 16 },  
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    ph15: {paddingHorizontal: 15},
    positioRelative: {position: 'relative'},
    w100p: { width: '100%' },
});