import React, { useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { connect } from 'react-redux';

const EmptyData = ({ navigation, data }) => {

    useEffect(() => {
        if (data.length > 0) {
            navigation.navigate("ListNotes")
        }
    }, [data])
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.image} source={require("~/assets/nodata.png")} />
                <Text>Tidak Ada Catatan</Text>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("AddNote")}
                >
                    <Text style={{ fontSize: 28, color: "#fff" }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", justifyContent: "space-between"
    },
    top: { flex: 2, justifyContent: "center", alignContent: "center", alignItems: "center" },
    bottom: { flex: 1, justifyContent: "flex-end", alignContent: "flex-end", alignItems: "flex-end", padding: 20 },
    image: { width: 300, height: 300 },
    button: {
        backgroundColor: "#E9897E",
        width: 70, height: 70,
        justifyContent: "center", alignItems: "center",
        borderRadius: 10, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
})


const mapStateToProps = state => {
    const { note } = state;
    const { data } = note
    return {
        data
    };
}
const mapDispatchToProps = {
    // SetUser,
    // SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyData);
// export default EmptyData