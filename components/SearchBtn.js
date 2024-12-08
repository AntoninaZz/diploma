import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Style.js';

const SearchBtn = ({ handleNavigate }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleNavigate} >
            <Text style={styles.buttonLabel} >🔍 Визначити сорт</Text>
        </TouchableOpacity>
    )
}

export default SearchBtn;