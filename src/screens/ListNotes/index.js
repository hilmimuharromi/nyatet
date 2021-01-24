import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, BackHandler, Alert } from "react-native"
import { connect } from 'react-redux';
import { DeleteNote, SetCurrentNote, ResetEditor } from "~/stores/action"
import CardNotes from "~/components/CardNotes"
import getWidth from "~/utils/getWidth"

const ListNote = ({ route, navigation, data, DeleteNote, SetCurrentNote, ResetEditor }) => {
    const [filteredData, setFilteredData] = useState([])
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        if (data.length < 1) {
            navigation.push("EmptyData")
        }
    }, [data])

    const backAction = () => {
        console.log("route ===", route.name)
        Alert.alert("anda akan keluar dari Nyatet App", "lanjutkan?", [
            {
                text: "Tetep Disini",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Ya", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const searchData = (text) => {
        if (!text) {
            setSearchText("")
            return setFilteredData([])
        } else {
            setSearchText(text)
            const newData = data.filter((item) => item.title.toUpperCase().includes(text.toUpperCase()))
            console.log(text, newData)
            setFilteredData(newData)
        }
    }

    const onClickNote = (item) => {
        console.log(item, "html ...")
        SetCurrentNote(item)
        navigation.push("DetailNote")
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.textTitle}>NYATET</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder={"Cari Catatan ..."}
                    onChangeText={(text) => {
                        searchData(text)
                    }
                    }
                ></TextInput>
            </View>
            <View style={styles.listLayout}>
                <FlatList
                    data={searchText ? filteredData.sort((a, b) => a.date < b.date) : data.sort((a, b) => a.date < b.date)}
                    renderItem={({ item }) => <CardNotes item={item} DeleteNote={DeleteNote} onClickNote={onClickNote} />}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        ResetEditor()
                        navigation.push("AddNote")
                    }}
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
    top: {
        paddingTop: 10,
        paddingLeft: 20,
        width: getWidth(95),
        marginVertical: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#E9897E",
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 50
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    listLayout: { flex: 4, justifyContent: "center", alignContent: "center", alignItems: "center" },
    bottom: { justifyContent: "flex-end", alignContent: "flex-end", alignItems: "flex-end", padding: 20, height: 70 },
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
    // console.log(data)
    return {
        data
    };
}
const mapDispatchToProps = {
    DeleteNote,
    SetCurrentNote,
    ResetEditor

}
export default connect(mapStateToProps, mapDispatchToProps)(ListNote);