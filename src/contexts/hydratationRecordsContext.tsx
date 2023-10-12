import { ReactNode, createContext, useState, useContext, useCallback } from "react";
import { HydratationRecordsRepository, THydrationRecord, THydrationRecords } from "../repositories/HydratationRecords";
import { useFocusEffect } from "expo-router/src/useFocusEffect";
import { SettingsRepository, TSettings } from "../repositories/settings";

interface THydratationRecordsContext {
    hydratationRecords: THydrationRecords
    hydrationRecordsPerDay: number
    waterPerDrink: number
    userGender: "male" | "female"

    clearData(): void
    drinkWater(): Promise<void>
    computeWaterDranktoday(): Promise<number>
    getHydratationRecordsTodayList(): Promise<THydrationRecord[]>
    updateSettings(settings: Partial<TSettings>): void
}

interface THydratationRecordsProviderProps {
    children: ReactNode
}

export const HydratationRecordsContext = createContext({} as THydratationRecordsContext);

export function HydratationRecordsProvider ({children}: THydratationRecordsProviderProps) {

    const hydratationRecordsRepository = new HydratationRecordsRepository();
    const settingsRepository = new SettingsRepository();
    
    const [ waterPerDrink, setWaterPerDrink ] = useState(200);
    const [ userWeight, setUserWeight ] = useState(60);
    const [ userGender, setUserGender ] = useState<"male" | "female">("male");

    const hydrationRecordsPerDay = userWeight * (userGender === "male" ? 35 : 31);
    
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
        setHydratationRecords({});
    }

    const updateSettings = (settings: Partial<TSettings>) => {
        settings.cupSize && setWaterPerDrink(settings.cupSize);
        settings.gender && setUserGender(settings.gender);
        settings.weight && setUserWeight(settings.weight);

        settingsRepository.updateSettings(settings);
    }

    useFocusEffect(useCallback(() => {
        hydratationRecordsRepository.getAll()
        .then(setHydratationRecords)
        .catch(console.error)

        settingsRepository.getSettings()
        .then(data => {
            setUserGender(data.gender);
            setWaterPerDrink(data.cupSize);
            setUserWeight(data.weight);
        })
        .catch(console.error)
    }, []))

    return (
        <HydratationRecordsContext.Provider value={{
            hydratationRecords,
            hydrationRecordsPerDay,
            waterPerDrink,
            userGender,
            getHydratationRecordsTodayList,
            computeWaterDranktoday,
            drinkWater,
            updateSettings,
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