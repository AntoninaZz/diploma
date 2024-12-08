import { SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';
import { url, imgSrc } from '../constants/constants';
import Tile from '../components/Tile';
import styles from '../styles/Style.js';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch(url+'?page=options');

    return (
        <SafeAreaView style={[styles.container, {flex: 1}]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightvanilla },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.darkpink} />
            ) : error ? (
                <Text style={styles.title}>Щось пішло не так :( {"\n"}Перевірте підключення до Інтернету</Text>
            ) : data.options.map((tile) => (<Tile key={tile.id} title={tile.title} img={imgSrc+'options/'+tile.img} handleNavigate={() => router.push({pathname: `/catalogue-screen/${tile.route}`, params: {title: tile.title,}})} />))}
        </SafeAreaView> 
    )
}

export default Home;