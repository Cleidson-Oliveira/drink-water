import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#38c",
        padding: 16,
        borderRadius: 8,
        gap: 16,
    },
    title: {
        fontSize: 16,
        color: "#fff"
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
    },
    listItemText: {
        color: "#fff"
    },
    separator: {
        height: 8
    }
});