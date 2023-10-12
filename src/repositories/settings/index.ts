import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TSettings {
    weight: number
    gender: "male" | "female"
    cupSize: number
}

export class SettingsRepository {
    private SETTINGS_KEY_DATABASE = "@drink-water.settings";
    private defaultSettings: TSettings = {
        cupSize: 200,
        gender: "male",
        weight: 60
    };

    private async save (settings: TSettings) {
        await AsyncStorage.setItem(this.SETTINGS_KEY_DATABASE, JSON.stringify(settings));
    }

    public async getSettings (): Promise<TSettings> {
        const settingsJson = await AsyncStorage.getItem(this.SETTINGS_KEY_DATABASE);

        const settings = settingsJson ? JSON.parse(settingsJson) : this.defaultSettings;
        
        return settings;
    }

    public async updateSettings (params: Partial<TSettings>): Promise<TSettings> {
        const settings = await this.getSettings();

        const updatedSettings: TSettings = {
            ...settings,
            ...params
        }
        
        this.save(updatedSettings);

        return updatedSettings
    }
}