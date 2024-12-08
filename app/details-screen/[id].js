import { Text, SafeAreaView, View, TextInput, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { COLORS } from '../../constants/theme';
import { imgSrc, gap } from '../../constants/constants';
import styles from '../../styles/Style.js';
import React, { useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { Dimensions } from 'react-native';

const Details = () => {
    const params = useGlobalSearchParams(); //get id of the page
    const router = useRouter();
    const [dose, onChangeDose] = React.useState(params.dose);
    const [volume, onChangeVolume] = React.useState(params.volume);
    const [water, onChangeWater] = React.useState(0);
    const [drug, onChangeDrug] = React.useState(0);
    const [availableSpace, onChangeSpace] = React.useState(0);
    const vw = Dimensions.get('window').width;

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        onChangeSpace(height);
    }

    return (
        <SafeAreaView onLayout={onLayout} style={[styles.container, { flex: 1, flexFlow: 'collumn', paddingBottom: 3 * gap }]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.darkgreen },
                    headerTintColor: COLORS.vanilla,
                    headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat', },
                    headerShadowVisible: false,
                    headerTitle: params.title,
                    headerBackTitle: 'До каталогу',
                }}
            />
            <ScrollView style={{ height: availableSpace }} contentContainerStyle={[styles.container, { flexWrap: 'wrap' }]}>
                <View style={{ marginVertical: 2 * gap }}>
                    <Image source={`${imgSrc}${params.categorie}/${params.img}`} style={styles.bigImage} />
                    <Text style={styles.bigTitle}>{params.title}</Text>
                </View>
                {params.categorie == 'drugs' ? <View style={[styles.block, { flexFlow: 'row', gap: gap }]}><Text style={styles.label}>Клас</Text><Text style={styles.text}>{params.class ? params.class : '–'}</Text></View> : ''}
                <View style={styles.block}>
                    <Text style={styles.label}>Опис</Text>
                    <Text style={styles.text}>{params.description}{params.alt_titles ? ` Інші назви цього сорту: ${params.alt_titles}.` : ''}</Text>
                </View>
                {params.categorie == 'orchids' ?
                    <View style={styles.block}>
                        <Text style={styles.label}>Характеристики</Text>
                        <View style={styles.table}>
                            <View style={styles.tr}><Text style={styles.text}>Колір</Text><Text style={styles.text}>{params.color ? params.color : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Розмір квітки</Text><Text style={styles.text}>{params.flower_size ? params.flower_size + ' см' : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Колір губи</Text><Text style={styles.text}>{params.lip_color ? params.lip_color : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Візерунок</Text><Text style={styles.text}>{params.pattern ? params.pattern : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Колір візерунку</Text><Text style={styles.text}>{params.pattern_color ? params.pattern_color : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Облямівка</Text><Text style={styles.text}>{params.border ? params.border : '–'}</Text></View>
                            <View style={styles.tr}><Text style={styles.text}>Клас</Text><Text style={styles.text}>{params.classes ? params.classes : '–'}</Text></View>
                        </View>
                    </View> :
                    <View style={styles.block}>
                        <Text style={[styles.bigTitle, styles.sectionTitle, styles.calcTitle]}>Розрахувати дозування</Text>
                        <Text style={styles.label}>Концентрація</Text>
                        <View style={styles.line}>
                            <TextInput style={styles.input} onChangeText={onChangeDose} value={dose} keyboardType="numeric" />
                            <Text style={styles.text}> {params.d_unit ? params.d_unit : 'г'} на </Text>
                            <TextInput style={styles.input} onChangeText={onChangeVolume} value={volume} keyboardType="numeric" />
                            <Text style={styles.text}> л</Text>
                        </View>
                        <Text style={[styles.label, { marginTop: gap }]}>Дозування</Text>
                        <Slider
                            value={water}
                            onValueChange={(value) => {
                                onChangeWater(Number.parseInt(value));
                                onChangeDrug(((value * dose) / (volume * 1000)).toFixed(2));
                            }}
                            style={{ width: '75vw', height: 3 * gap }}
                            minimumValue={0}
                            maximumValue={5000}
                            minimumTrackTintColor={COLORS.darkgreen}
                            maximumTrackTintColor={COLORS.lightgreen}
                            thumbTintColor={COLORS.darkgreen}
                            steps={50}
                        />
                        <Text style={[styles.text, { marginLeft: water * 0.7 * vw / 5000 }]}>{water < 1000 ? water + ' мл' : water / 1000 + ' л'}{'\nводи'}</Text>
                        <Text style={[styles.input, { backgroundColor: 'none', width: 'auto' }]}>{drug} {params.d_unit ? params.d_unit : 'г'}</Text>
                        <Text style={[styles.text, { textAlign: 'right' }]}>препарату</Text>
                    </View>
                }</ScrollView>
        </SafeAreaView>
    );
}

export default Details;