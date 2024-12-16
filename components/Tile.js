import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import styles from '../styles/Style.js';
import { gap } from '../constants/constants';

const Tile = ({ title, img, handleNavigate, percent, tags }) => {
    let tagCount = 0;
    let label = percent ? (<Text style={[styles.tag, styles.percentTag]}>{percent}%</Text>) : undefined;
    if (label) tagCount++;
    let tagBigLip = tags ? (tags.isBigLip ? (<Text style={[styles.tag, styles.bigLipTag, { top: gap + gap * tagCount * 3, }]}>BigLip</Text>) : undefined) : undefined;
    if (tagBigLip) tagCount++;
    let tagAroma = tags ? (tags.isAroma ? (<Text style={[styles.tag, styles.aromaTag, { top: gap + gap * tagCount * 3, }]}>Aroma</Text>) : undefined) : undefined;
    if (tagAroma) tagCount++;
    let tagMini = tags ? (tags.isMini ? (<Text style={[styles.tag, styles.miniTag, { top: gap + gap * tagCount * 3, }]}>Mini</Text>) : undefined) : undefined;
    if (tagMini) tagCount++;
    let tagMultiflora = tags ? (tags.isMultiflora ? (<Text style={[styles.tag, styles.multiTag, { top: gap + gap * tagCount * 3, }]}>Multi</Text>) : undefined) : undefined;
    return (
        <TouchableOpacity onPress={handleNavigate} style={styles.tile}>
            <Image source={img} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            {label}
            {tagBigLip}
            {tagAroma}
            {tagMini}
            {tagMultiflora}
        </TouchableOpacity>
    )
}

export default memo(Tile);