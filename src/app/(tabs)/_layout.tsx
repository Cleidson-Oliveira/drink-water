import { Tabs } from 'expo-router/tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 

export default function AppLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
            sceneContainerStyle={{
                padding: 12,
                backgroundColor: "#fdfdff"
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({size, color}) => (
                        <AntDesign
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="hydratation-records"
                options={{
                    title: "Histórico",
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons
                            name="history-toggle-off"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Configurações",
                    tabBarIcon: ({size, color}) => (
                        <AntDesign
                            name="setting"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
