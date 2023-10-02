import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/button";

export default function Settings () {

    return (
        <View>
            <View style={styles.configBox}>
                <Text style={styles.configTitle}>Cup size (ml)</Text>
                <View style={styles.buttonsContainer}>
                    <Button textContent="100" />
                    <Button textContent="200" />
                    <Button textContent="300" />
                    <Button textContent="400" />
                    <Button textContent="500" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    configBox: {
        padding: 8,
        borderBottomColor: "#aaa",
        borderBottomWidth: 1,
        gap: 8,
    }, 
    configTitle: {
        fontSize: 24,
        fontWeight: "500"
    },
    buttonsContainer: {
        gap: 16,
        flexDirection: "row"
    }
})