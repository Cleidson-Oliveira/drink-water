import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#38c",
        padding: 16,
        borderRadius: 8,
        gap: 16,
    },
    header: {
        gap: 4
    },
    headerText: {
        color: "#fff",
        fontSize: 16
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    waterProgress: {
        height: 4,
        backgroundColor: "#eef",
    }
});