import AsyncStorage from "@react-native-async-storage/async-storage";

export interface THydrationRecord {
    drinkTime: number
    waterAmount: number
}

export interface THydrationRecords {
    [ dateIndentification: string ]: THydrationRecord[]
}

export class HydratationRecordsRepository {

    private HIDRATATION_RECORDS_KEY_DATABASE = "@drink-water.hidratation-records";

    private async formatHydratationRecordsJson (json: string): Promise<THydrationRecords> {        
        return await JSON.parse(json);
    }

    private dateIdentificationGenetator (): string {
        const date = new Date();

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const dateIdentification = `${day}-${month}-${year}`;
        
        return dateIdentification;
    }
    
    public async getAll (): Promise<THydrationRecords> {
        const hydratationRecordsJson = await AsyncStorage.getItem(this.HIDRATATION_RECORDS_KEY_DATABASE);
        
        if (!hydratationRecordsJson) return {} as THydrationRecords;

        const hydratationRecords = await this.formatHydratationRecordsJson(hydratationRecordsJson);

        return hydratationRecords;
    }

    public async getToday (): Promise<THydrationRecord[]> {
        const dateIdentification = this.dateIdentificationGenetator();

        const hydratationRecords = await this.getAll();

        if(!hydratationRecords[dateIdentification]) return [];

        return hydratationRecords[dateIdentification];
    }

    public async save (hydrationRecord: THydrationRecord) {
        
        const dateIdentification = this.dateIdentificationGenetator();

        const hydratationRecords = await this.getAll();
        
        if(!hydratationRecords[dateIdentification]) {
            hydratationRecords[dateIdentification] = [hydrationRecord];
            
        } else {
            hydratationRecords[dateIdentification].push(hydrationRecord);
            
        }
        
        await AsyncStorage.setItem(
            this.HIDRATATION_RECORDS_KEY_DATABASE,
            JSON.stringify(hydratationRecords)
        );

    }

    public clear () {
        AsyncStorage.removeItem(this.HIDRATATION_RECORDS_KEY_DATABASE);
    }
}