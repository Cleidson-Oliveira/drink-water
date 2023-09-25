import { Text, View } from "react-native";
import { styles } from "./style";
import { Button } from "../button";
import { useState } from "react";

export function WaterStatus () {

    const hydrationRecordsPerDay = 2500;
    const waterPerDrink = 200;
    
    const [ hydrationRecordsToday, setHydrationRecordsToday ] = useState(0);

    const drinkWater = () => {
        setHydrationRecordsToday(prevState => {
            return prevState + waterPerDrink > hydrationRecordsPerDay ? hydrationRecordsPerDay : prevState + waterPerDrink
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>{hydrationRecordsToday} ml</Text>
                    <Text style={styles.headerText}>{hydrationRecordsPerDay} ml</Text>
                </View>
                
                <View style={[
                    { width: `${Math.round(hydrationRecordsToday * 100 / hydrationRecordsPerDay)}%` }, 
                    styles.waterProgress
                ]}/>
            </View>
            <View>
                <Button textContent="Bebi água!" onPress={drinkWater} />
            </View>
        </View>
    )
}