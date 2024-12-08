import {Dimensions} from 'react-native';

const url = 'https://script.google.com/macros/s/AKfycbzc2F9AUiAF1zC4mcQWZsF55h9_PSZrVl4awbPfqrbGW_jlfKyu4NS0jMCRlhWYVMvyzQ/exec';
const imgSrc = 'https://antoninazz.github.io/phalaenopsis/images/';
const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const gap = 10;
const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

export { url, imgSrc, itemSize, numColumns, gap };