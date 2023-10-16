import { StyleSheet, Text, View } from "react-native";
import { useHydratationRecords } from "../../contexts/hydratationRecordsContext";
import { useEffect, useMemo, useState } from "react";
import { THydrationRecord } from "../../repositories/HydratationRecords";
import { Chart } from "../../components/chart";
import { WaterStatus } from "../../components/waterStatus";
import { WaterCuriosityCard } from "../../components/waterCuriosityCard";

export default function HydratationRecords () {

    const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const { hydratationRecords } = useHydratationRecords();

    const [weekHydratationRecords, setWeekHydratationRecords] = useState<number[] | null>(null);
    
    const getDaysofWeekHydratationRecords = () => {
        const today = new Date();
        const waterAmount: number[] = [];

        for(var i = 0; i < 7; i++) {
            today.setHours(-i);

            const title =`${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

            waterAmount.unshift(getDailyWater(hydratationRecords[title]));
        }

        setWeekHydratationRecords(waterAmount);
    }

    const getDailyWater = (waterData: THydrationRecord[] | undefined) => {
        if (!waterData) return 0;

        const amount = waterData.reduce((acc, cur) => {
            return acc + cur.waterAmount
        }, 0)

        return amount;
    }

    const days = useMemo(() => {
        const today = new Date();
        const daysOfWeek: string[] = [];

        for(var i = 0; i < 7; i++) {
            today.setHours(-i);

            daysOfWeek.unshift(DAYS_OF_WEEK[today.getDay()]);
        }

        return daysOfWeek
    }, [])

    useEffect(() => {
        hydratationRecords && getDaysofWeekHydratationRecords();
    }, [hydratationRecords])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Ingestão semanal
                </Text>
                { weekHydratationRecords && <Chart data={weekHydratationRecords} labels={days} />}
            </View>
            <WaterStatus />
            <WaterCuriosityCard />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        gap: 16
    },
    title: {
        fontSize: 24,
        fontWeight: "500"
    }
})