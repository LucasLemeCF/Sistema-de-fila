import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#000000",
        flex: 1,
    },
    screen: {
        flexDirection: "row", 
        flexWrap: "wrap",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "#121212",
        width: "90%",
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#23036A",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#121212",
    },
    cellInput: {
        width: "16%",
        flexDirection: "row",
        textAlign: "center",
        backgroundColor: "#333333",
        color: "#fff",
        margin: 1,
    },
    cell: {
        width: "16%",
        flexDirection: "row",
        textAlign: "center",
        backgroundColor: "#2c2c2c",
        color: "#fff",
        margin: 1,
    },
    cellHeader: {
        width: "16.5%",
        flexDirection: "row",
        textAlign: "center",
        fontWeight: 'bold',
        color: "#fff",
    },
    title: {
        backgroundColor: "#121212",
        width: "90%",
        marginTop: 40,
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        color: "#fff",
    },
});
  
export default styles;