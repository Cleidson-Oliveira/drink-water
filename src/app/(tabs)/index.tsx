import { StyleSheet, View } from "react-native";
import { WaterCuriosityCard } from "../../components/waterCuriosityCard";
import { WaterStatus } from "../../components/waterStatus";

export default function Home () {

    return (
        <View style={styles.container}>
            <WaterCuriosityCard />
            <WaterStatus />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    }
})