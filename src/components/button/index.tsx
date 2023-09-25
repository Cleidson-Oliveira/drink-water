import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    textContent: string
}

export function Button ({textContent, ...props}: ButtonProps) {

    return (
        <TouchableOpacity {...props} style={styles.button}>
            <Text style={styles.buttonTextContent}>
                {textContent}
            </Text>
        </TouchableOpacity>
    )
}