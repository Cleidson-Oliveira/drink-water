import { Text, View } from "react-native";
import { styles } from "./style";
import { Button } from "../button";
import { useState, useEffect, useCallback } from "react";
import { useHydratationRecords } from "../../contexts/hydratationRecordsContext";

export function WaterStatus () {

    const { drinkWater, hydrationRecordsPerDay, hydratationRecords, computeWaterDranktoday } = useHydratationRecords();
    
    const [ hydrationRecordsToday, setHydrationRecordsToday ] = useState(0);

    useEffect(() => {

        computeWaterDranktoday()
        .then(setHydrationRecordsToday)
        .catch(console.error);

    }, [hydratationRecords])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>{hydrationRecordsToday} ml</Text>
                    <Text style={styles.headerText}>{hydrationRecordsPerDay} ml</Text>
                </View>
                
                <View style={[
                    { 
                        width: `${
                            hydrationRecordsToday > hydrationRecordsPerDay 
                            ? 100
                            : Math.round(hydrationRecordsToday * 100 / hydrationRecordsPerDay)
                        }%`
                    }, 
                    styles.waterProgress
                ]}/>
            </View>
            <View>
                <Button textContent="Bebi água!" onPress={drinkWater} />
            </View>
        </View>
    )
}