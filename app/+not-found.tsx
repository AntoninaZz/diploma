import { Link, Stack } from 'expo-router';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { COLORS } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.darkgreen },
        headerTintColor: COLORS.vanilla,
        headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat', },
        headerShadowVisible: false,
        title: ''
      }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Упс!</Text>
        <Text style={styles.text}>Сторінка відсутня :(</Text>
        <Link href="/" style={styles.link}>
          <Text>Повернутись на головну</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.lightvanilla,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontFamily: 'Montserrat',
    color: COLORS.purple,
    textDecorationLine: 'underline',
  },
  text: {
    color: COLORS.brown,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  title: {
    color: COLORS.brown,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 48,
  },
});
