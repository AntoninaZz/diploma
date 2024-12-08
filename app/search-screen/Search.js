import { Text, SafeAreaView, ActivityIndicator, View, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup from 'react-native-radio-buttons-group';
import React, { useState } from 'react';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import SearchBtn from '../../components/SearchBtn';
import { COLORS } from '../../constants/theme';
import useFetch from '../../hooks/useFetch';
import { url } from '../../constants/constants';
import styles from '../../styles/Style.js';
import selectStyles from '../../styles/Select.js';
import { gap } from '../../constants/constants';

const Search = () => {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useFetch(`${url}?page=colors`);
    const [title, onChangeTitle] = React.useState('');
    const [background, onChangeBackground] = React.useState('');
    const [size, onChangeSize] = React.useState('');
    const [lip, onChangeLip] = React.useState('');
    const [pattern, onChangePattern] = React.useState('');
    const [patternColor, onChangePatternColor] = React.useState('');
    const [border, onChangeBorder] = React.useState('');
    const [isBigLip, setBigLip] = useState(false);
    const [isAroma, setAroma] = useState(false);
    const [isMini, setMini] = useState(false);
    const [isMultiflora, setMultyflora] = useState(false);
    let backgroundItems = [];
    let lipItems = [];
    let patternColorItems = [];
    let patternItems = [
        { label: 'Однотонний', value: 'Однотонний' },
        { label: 'Дрібноплямистий', value: 'Дрібноплямистий' },
        { label: 'Крупноплямистий', value: 'Крупноплямистий' },
        { label: 'Венозний', value: 'Венозний' },
        { label: 'Градієнт', value: 'Градієнт' },
    ];
    let sizeItems = [
        { label: '3-6 см', value: 'mini' },
        { label: '7-9 см', value: 'midi' },
        { label: '10-12 см', value: 'large' },
    ];
    let radioButtons = [
        {
            id: '0',
            label: (<Text style={[styles.formText, {paddingLeft: gap}]}>ні</Text>),
            value: false,
            color: COLORS.darkgreen,
        },
        {
            id: '1',
            label: (<Text style={[styles.formText, {paddingLeft: gap}]}>так</Text>),
            value: true,
            color: COLORS.darkgreen,
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { flex: 1, flexFlow: 'collumn' }]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.darkgreen },
                    headerTintColor: COLORS.vanilla,
                    headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat', },
                    headerShadowVisible: false,
                    headerTitle: "Визначити сорт",
                    headerBackTitle: 'До каталогу',
                }}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.darkpink} />
            ) : error ? (
                <Text style={styles.title}>Щось пішло не так :( {"\n"}Перевірте підключення до Інтернету</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.searchContainer}>
                    <View>
                        <Text style={[styles.text, styles.startSpace]}>Знайти сорт за назвою</Text>
                        <TextInput style={styles.nameSearch} onChangeText={onChangeTitle} value={title} placeholder="Введіть назву" />
                    </View>
                    <View>
                        <Text style={[styles.bigTitle, styles.sectionTitle]}>Визначити сорт</Text>
                        <RNPickerSelect style={selectStyles} items={sizeItems} onValueChange={onChangeSize} value={size} placeholder={{ label: 'Діаметр квітки', value: undefined }} />
                        <RNPickerSelect style={selectStyles} items={patternItems} onValueChange={onChangePattern} value={pattern} placeholder={{ label: 'Візерунок', value: undefined }} />
                        {
                            backgroundItems.length ? '' :
                                Object.values(data.colors.background_color).forEach(val => {
                                    backgroundItems.push({ label: val, value: val });
                                })
                        }
                        <RNPickerSelect style={selectStyles} items={backgroundItems} onValueChange={onChangeBackground} value={background} placeholder={{ label: 'Колір тла', value: undefined }} />
                        {
                            patternColorItems.length ? '' :
                                Object.values(data.colors.pattern_color).forEach(val => {
                                    patternColorItems.push({ label: val, value: val });
                                })
                        }
                        <RNPickerSelect style={selectStyles} items={patternColorItems} onValueChange={onChangePatternColor} value={patternColor} placeholder={{ label: 'Колір візерунку', value: undefined }} />
                        {
                            lipItems.length ? '' :
                                Object.values(data.colors.lip_color).forEach(val => {
                                    lipItems.push({ label: val, value: val });
                                })
                        }
                        <RNPickerSelect style={selectStyles} items={lipItems} onValueChange={onChangeLip} value={lip} placeholder={{ label: 'Колір губи', value: undefined }} />
                        <View>
                            <Text style={[styles.formText, styles.formTextGap]}>Облямівка</Text>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={onChangeBorder}
                                selectedId={border}
                                layout='row'
                                containerStyle={styles.radio}
                            />
                        </View>
                        <View style={styles.checkWrap}>
                            <Text style={[styles.formText, styles.formTextGap]}>Клас</Text>
                            <View style={styles.checkContainerGap}>
                                <View style={styles.checkContainer}>
                                    <Checkbox
                                        value={isBigLip}
                                        onValueChange={(newValue) => setBigLip(newValue)}
                                        color={COLORS.darkgreen}
                                    />
                                    <Text style={[styles.formText, styles.checkBoxLabel]}>Біг ліп</Text>
                                </View>
                                <View style={styles.checkContainer}>
                                    <Checkbox
                                        value={isAroma}
                                        onValueChange={(newValue) => setAroma(newValue)}
                                        color={COLORS.darkgreen}
                                    />
                                    <Text style={[styles.formText, styles.checkBoxLabel]}>Ароматна</Text>
                                </View>
                                <View style={styles.checkContainer}>
                                    <Checkbox
                                        value={isMini}
                                        onValueChange={(newValue) => setMini(newValue)}
                                        color={COLORS.darkgreen}
                                    />
                                    <Text style={[styles.formText, styles.checkBoxLabel]}>Міні</Text>
                                </View>
                                <View style={styles.checkContainer}>
                                    <Checkbox
                                        value={isMultiflora}
                                        onValueChange={(newValue) => setMultyflora(newValue)}
                                        color={COLORS.darkgreen}
                                    />
                                    <Text style={[styles.formText, styles.checkBoxLabel]}>Мультифлора</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <SearchBtn handleNavigate={() => router.push({ pathname: `/catalogue-screen/orchids`, params: { title: 'Результати пошуку', search: title, size: size, pattern: pattern, background: background, patternColor: patternColor, lip: lip, border: parseInt(border) ? "Присутня" : "Відсутня", isBigLip, isAroma, isMini, isMultiflora } })} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export default Search;