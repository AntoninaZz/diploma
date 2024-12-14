import { Text, SafeAreaView, ActivityIndicator, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import Tile from '../../components/Tile';
import SearchBtn from '../../components/SearchBtn';
import useFetch from '../../hooks/useFetch';
import { COLORS } from '../../constants/theme';
import { url, imgSrc, itemSize, numColumns, gap } from '../../constants/constants';
import styles from '../../styles/Style.js';

const Catalogue = () => {
    const params = useGlobalSearchParams(); //get id of the page
    const router = useRouter();
    const { data, isLoading, error, refetch } = useFetch(`${url}`); //?page=${params.id}
    const [search, onChangeSearch] = React.useState('');
    const [availableSpace, onChangeSpace] = React.useState(0);

    function compareByColor(a, b) {
        for (let type in data.colors) {
            let numA = Object.keys(data.colors[type]).find(key => data.colors[type][key] === a[type]) || 0;
            let numB = Object.keys(data.colors[type]).find(key => data.colors[type][key] === b[type]) || 0;
            if (numA - numB != 0) {
                return numA - numB;
            }
        }
        compareByTitle(a, b);
    }

    function compareByTitle(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function comparePercent(searchOrchid, dbOrchid) {
        let percent = 0;
        for (let prop in searchOrchid) {
            if (prop == "flower_size") {
                switch (searchOrchid[prop]) {
                    case 'mini':
                        if (dbOrchid[prop] > 0 && dbOrchid[prop] <= 6) percent += 20;
                        break;
                    case 'midi':
                        if (dbOrchid[prop] > 6 && dbOrchid[prop] <= 9) percent += 20;
                        break;
                    case 'large':
                        if (dbOrchid[prop] > 9) percent += 20;
                        break;
                }
            } else if (prop == "classes") {
                const searchOrchidClasses = { isBigLip: searchOrchid[prop].isBigLip == 'true', isAroma: searchOrchid[prop].isAroma == 'true', isMini: searchOrchid[prop].isMini == 'true', isMultiflora: searchOrchid[prop].isMultiflora == 'true' };
                const dbOrchidClasses = { isBigLip: dbOrchid[prop].includes("Біг ліп"), isAroma: dbOrchid[prop].includes("Ароматна"), isMini: dbOrchid[prop].includes("Міні"), isMultiflora: dbOrchid[prop].includes("Мультифлора") };
                for (let orchidClass in searchOrchidClasses) {
                    if (searchOrchidClasses[orchidClass] == dbOrchidClasses[orchidClass]) percent += 10;
                }
            } else if (prop == "pattern") {
                if (dbOrchid[prop].includes(searchOrchid[prop])) percent += 50;
            } else if (dbOrchid[prop] == searchOrchid[prop]) {
                switch (prop) {
                    case "background_color":
                        percent += 50;
                        break;
                    case "pattern_color":
                    case "lip_color":
                        percent += 20;
                        break;
                    case "border":
                        percent += 10;
                        break;
                }
            }
        }
        return Math.round((percent / 2.1) * 10) / 10;
    }

    function searchFlower(title, size, pattern, background, patternColor, lip, border, isBigLip, isAroma, isMini, isMultiflora) {
        const classes = { isBigLip: isBigLip, isAroma: isAroma, isMini: isMini, isMultiflora: isMultiflora };
        const searchOrchid = { title: title, flower_size: size, pattern: pattern, background_color: background, pattern_color: patternColor, lip_color: lip, border: border, classes: classes };
        let result = [];
        if (title ? title.length : undefined) {
            result = data[params.id] ? params.id == 'orchids' ? data[params.id].filter((orchid) => orchid.title.toLowerCase().includes(title.toLowerCase())).concat(data[params.id].filter((orchid) => orchid.alt_titles.toLowerCase().includes(title.toLowerCase()))) : data[params.id].filter((orchid) => orchid.title.toLowerCase().includes(title.toLowerCase())) : [];
        } else {
            result = data[params.id] ? data[params.id].filter((orchid) => comparePercent(searchOrchid, orchid) > 74).sort((a, b) => comparePercent(searchOrchid, b) - comparePercent(searchOrchid, a)).map((orchid) => orchid = { ...orchid, percent: comparePercent(searchOrchid, orchid) }) : [];
        }
        return result.length ? result : undefined;
    }

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        onChangeSpace(height);
    }

    return (
        <SafeAreaView onLayout={onLayout} style={[styles.container, { flex: 1 }, !isLoading && !error ? { alignItems: 'flex-start' } : {}]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.darkgreen },
                    headerTintColor: COLORS.vanilla,
                    headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat', },
                    headerShadowVisible: false,
                    headerTitle: params.title,
                    headerBackTitle: 'На головну',
                }}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.darkpink} />
            ) : error ? (
                <Text style={styles.title}>Щось пішло не так :( {"\n"}Перевірте підключення до Інтернету</Text>
            ) : <FlatList
                data={Object.keys(params).length > 2 ?
                    searchFlower(params.search, params.size, params.pattern, params.background, params.patternColor, params.lip, params.border, params.isBigLip, params.isAroma, params.isMini, params.isMultiflora) :
                    data[params.id] ? data[params.id].sort(compareByColor) : []}
                renderItem={({ item }) =>
                    <Tile
                        title={item.title}
                        img={`${imgSrc}${params.id}/${item.img}`}
                        percent={item.percent}
                        tags={params.id == 'orchids' ? { isBigLip: item.classes.includes("Біг ліп"), isAroma: item.classes.includes("Ароматна"), isMini: item.classes.includes("Міні"), isMultiflora: item.classes.includes("Мультифлора") } : undefined}
                        style={{ height: itemSize, width: itemSize, }}
                        handleNavigate={() => router.push({ pathname: `/details-screen/${item.title}`, params: { categorie: params.id, ...item } })} />}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                contentContainerStyle={[styles.container, { paddingBottom: 2 * gap, flexWrap: 'wrap' }]}
                style={{ height: availableSpace }}
                columnWrapperStyle={{ gap }}
                ListEmptyComponent={<Text style={[styles.title, { height: '85vh', marginTop: gap }]}>За запитом нічого не знайдено :(</Text>}
                ListHeaderComponent={params.id == 'orchids' ?
                    <SearchBtn handleNavigate={() => router.push(`/search-screen/Search`)} /> :
                    <TextInput
                        style={styles.search}
                        onChangeText={onChangeSearch}
                        value={search}
                        placeholder="🔍 Знайти препарат"
                        onSubmitEditing={() => router.push({ pathname: `/catalogue-screen/drugs`, params: { title: 'Результати пошуку', search: search } })}
                    />} />}
        </SafeAreaView>
    );
}

export default Catalogue;