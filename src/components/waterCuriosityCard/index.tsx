import { Text, View } from "react-native";
import Doctors from "../../assets/doctors.svg";
import { styles } from "./style";

export function WaterCuriosityCard () {

    const waterCuriosities = [
        "A água é vital para manter as funções corporais, como a regulação da temperatura, digestão e transporte de nutrientes.",
        "A desidratação pode afetar a concentração, memória e habilidades cognitivas, prejudicando o desempenho mental.",
        "Beber água ajuda a manter a pele hidratada e pode contribuir para um aspecto saudável e jovem.",
        "A água auxilia os rins na remoção de resíduos e toxinas do corpo através da urina.",
        "A hidratação adequada é essencial para otimizar o desempenho atlético e a resistência.",
        "Beber água pode aumentar temporariamente o metabolismo, auxiliando na queima de calorias.",
        "A água ajuda na quebra dos alimentos e na absorção de nutrientes pelo sistema digestivo.",
        "A hidratação adequada pode ajudar a prevenir constipação, pedras nos rins e infecções do trato urinário.",
        "Beber água antes das refeições pode ajudar a reduzir o apetite e a ingestão calórica.",
        "A água é essencial para todas as células do corpo, permitindo reações bioquímicas e processos celulares.",
    ]

    return (
        <View style={styles.container} >
            <Doctors width={100} height={100} />
            <View style={styles.content}>
                <Text style={styles.text}>
                    { waterCuriosities[Math.floor(Math.random() * waterCuriosities.length)] }
                </Text>
            </View>
        </View>
    )
}