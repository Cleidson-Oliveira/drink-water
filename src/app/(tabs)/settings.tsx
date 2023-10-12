import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/button";
import { useHydratationRecords } from "../../contexts/hydratationRecordsContext";
import { Input } from "../../components/input";

export default function Settings () {

    const { clearData } = useHydratationRecords();

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Cup size (ml)</Text>
                    <View style={styles.buttonsContainer}>
                        <Button textContent="100" />
                        <Button textContent="200" />
                        <Button textContent="300" />
                        <Button textContent="400" />
                    </View>
                </View>

                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Gênero</Text>
                    <View style={styles.buttonsContainer}>
                        <Button textContent="Masculino" />
                        <Button textContent="Feminino" />
                    </View>
                </View>

                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Peso (Kg)</Text>
                    <Input type="number" />
                </View>
            </View>
    
            <View>
                <Button textContent="Apagar dados" onPress={clearData} /> 
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
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