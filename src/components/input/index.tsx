import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

interface InputProps extends TextInputProps {
    type: "text" | "number"
}

export function Input ({type, ...props}: InputProps) {

    return (
        <TextInput 
            {...props}
            keyboardType={type === "number" ? "numeric" : undefined}
            style={styles.inputEl}
        />
    )
}