import { StyleSheet, View } from "react-native";
import { WaterCuriosityCard } from "../../components/waterCuriosityCard";
import { WaterStatus } from "../../components/waterStatus";
import { HydratationRecordList } from "../../components/hydratationRecordsList";
import { HydratationRecordsProvider } from "../../contexts/hydratationRecordsContext";

export default function Home () {

    return (
        <View style={styles.container}>
            <WaterCuriosityCard />
            <WaterStatus />
            <HydratationRecordList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    }
})