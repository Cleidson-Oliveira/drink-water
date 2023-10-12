import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/button";
import { useHydratationRecords } from "../../contexts/hydratationRecordsContext";
import { Input } from "../../components/input";
import { useState } from "react";

export default function Settings () {

    const { waterPerDrink, userGender, clearData, updateSettings } = useHydratationRecords();
    const [ weight, setWeight ] = useState("");

    const updateWeight = () => {
        const newWeight = parseInt(weight);

        updateSettings({weight: newWeight});
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Cup size (ml)</Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            active={waterPerDrink == 100}
                            textContent="100"
                            onPress={() => updateSettings({cupSize:100})}
                        />
                        <Button
                            active={waterPerDrink == 200}
                            textContent="200"
                            onPress={() => updateSettings({cupSize:200})}
                        />
                        <Button
                            active={waterPerDrink == 300}
                            textContent="300"
                            onPress={() => updateSettings({cupSize:300})}
                        />
                        <Button
                            active={waterPerDrink == 400}
                            textContent="400"
                            onPress={() => updateSettings({cupSize:400})}
                        />
                    </View>
                </View>

                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Gênero</Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            textContent="Masculino"
                            active={userGender=="male"}
                            onPress={() => updateSettings({gender: "male"})}
                        />
                        <Button
                            textContent="Feminino"
                            active={userGender=="female"}
                            onPress={() => updateSettings({gender: "female"})}
                        />
                    </View>
                </View>

                <View style={styles.configBox}>
                    <Text style={styles.configTitle}>Peso (Kg)</Text>
                    <View style={styles.weightForm}>
                        <Input 
                            type="number"
                            defaultValue="60"
                            onChangeText={setWeight}
                        />
                        <Button textContent="Salvar" onPress={updateWeight}/>
                    </View>
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
    },
    weightForm: {
        flexDirection: "row",
        gap: 16
    }
})