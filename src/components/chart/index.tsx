import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ChartProps {
    labels: string[]
    data: number[]
}

export function Chart ({ labels, data }: ChartProps) {

    return (
        <LineChart
            data={{
                labels,
                datasets: [{ data }]
            }}
            width={Dimensions.get("window").width - 20}
            height={200}
            yAxisSuffix="ml"
            chartConfig={chartConfig}
            bezier
            style={styles.chartContainer}
        />
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 8,
        borderRadius: 8,
    }
})

const chartConfig = {
    backgroundGradientFrom: "#0004fb",
    backgroundGradientTo: "#2672ff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#26f1ff"
    }
}