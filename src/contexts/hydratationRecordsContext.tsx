import { ReactNode, createContext, useState, useContext } from "react";
import { HydratationRecordsRepository, THydrationRecord, THydrationRecords } from "../repositories/HydratationRecords";
import { useFocusEffect } from "expo-router/src/useFocusEffect";

interface THydratationRecordsContext {
    hydratationRecords: THydrationRecords
    hydrationRecordsPerDay: number
    waterPerDrink: number

    clearData(): void
    drinkWater(): Promise<void>
    computeWaterDranktoday(): Promise<number>
    getHydratationRecordsTodayList(): Promise<THydrationRecord[]>
}

interface THydratationRecordsProviderProps {
    children: ReactNode
}

export const HydratationRecordsContext = createContext({} as THydratationRecordsContext);

export function HydratationRecordsProvider ({children}: THydratationRecordsProviderProps) {

    const hydratationRecordsRepository = new HydratationRecordsRepository();
    const hydrationRecordsPerDay = 2500;
    const waterPerDrink = 200;
    
    const [ hydratationRecords, setHydratationRecords ] = useState<THydrationRecords>({});

    const drinkWater = async () => {
        const hydratationRecord: THydrationRecord = {
            drinkTime: Date.now(),
            waterAmount: waterPerDrink
        }

        await hydratationRecordsRepository.save(hydratationRecord);

        const hydratationRecords = await hydratationRecordsRepository.getAll();

        setHydratationRecords(hydratationRecords);

    }

    const getHydratationRecordsTodayList = async () => {
        return await hydratationRecordsRepository.getToday();
    }

    const computeWaterDranktoday = async () => {
        const hydratationRecordToday = await hydratationRecordsRepository.getToday();

        const hydratationTotalAmountToday = hydratationRecordToday.reduce((acc, cur) => {
            return acc + cur.waterAmount;
        }, 0)

        return hydratationTotalAmountToday;
    }

    const clearData = () => {
        hydratationRecordsRepository.clear();
    }

    useFocusEffect(() => {
        hydratationRecordsRepository.getAll()
        .then(setHydratationRecords)
        .catch(console.error)
    })

    return (
        <HydratationRecordsContext.Provider value={{
            hydratationRecords,
            hydrationRecordsPerDay,
            waterPerDrink,
            getHydratationRecordsTodayList,
            computeWaterDranktoday,
            drinkWater,
            clearData,
        }}>
            {children}
        </HydratationRecordsContext.Provider>
    )
}

export const useHydratationRecords = () => {

    const context = useContext(HydratationRecordsContext);

    return {...context};
}