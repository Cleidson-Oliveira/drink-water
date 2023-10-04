import { View, Text } from "react-native";
import { styles } from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { THydrationRecord } from "../../repositories/HydratationRecords";
import { useHydratationRecords } from "../../contexts/hydratationRecordsContext";
import { useEffect, useState } from "react";

export function HydratationRecordList () {

    const { hydratationRecords, getHydratationRecordsTodayList} = useHydratationRecords()

    const [hydratationRecordToday, setHydratationRecordToday] = useState<THydrationRecord[]>([]);

    useEffect(() => {
        getHydratationRecordsTodayList()
            .then(setHydratationRecordToday)
            .catch(console.error)
    }, [hydratationRecords])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico</Text>

            <FlatList
                data={hydratationRecordToday}
                renderItem={({item}) => (
                    <HydratationRecordListItem drinkTime={item.drinkTime} />
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.listItemText}>Quando você beber água aparecerá aqui!</Text>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
            />
        </View>
    )
}

function HydratationRecordListItem ({drinkTime}: {drinkTime: number}) {
    const date = new Date(drinkTime);
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>
                {date.getHours().toString().padStart(2, "0")}:{date.getMinutes().toString().padStart(2, "0")}
            </Text>
        </View>
    )
}