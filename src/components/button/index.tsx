import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    active?: boolean
    textContent: string
}

export function Button ({textContent, active = true, ...props}: ButtonProps) {

    return (
        <TouchableOpacity 
            {...props}
            activeOpacity={.8}
            style={active ? styles.button : styles.inactiveButton}
        >
            <Text style={styles.buttonTextContent}>
                {textContent}
            </Text>
        </TouchableOpacity>
    )
}