import React, { useEffect } from "react"
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler
} from "react-native"

import { connect, useDispatch } from 'react-redux';
import moment from "moment"
import {
    SetEditorTitle,
    SaveNote,
    ResetEditor

} from "~/stores/action"
import Editor from "~/components/Editor"

const AddNote = ({
    navigation,
    content,
    title,
    idNote,
    SetEditorTitle,
    // SaveNote,
    // ResetEditor
}) => {
    const dispatch = useDispatch()

    const saveData = () => {
        let payload = {
            title,
            content,
            idNote: idNote || "",
            date: moment().format("DD-MM-YYYY HH:mm:ss")
        }
        if (!payload.title) {
            payload.title = `draft ${payload.date}`
        }
        console.log("masuk save ....", payload)
        dispatch(SaveNote(payload))
        dispatch(ResetEditor())
        // SaveNote(payload)
        // ResetEditor()
    }

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, height: 70 }}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSave} onPress={() => {
                    saveData()
                    navigation.push("ListNotes")
                }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>SAVE</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                <TextInput value={title} onChangeText={(text) => SetEditorTitle(text)} multiline placeholder={"Judul ...."} style={{ borderBottomColor: "black", borderBottomWidth: 0.5, paddingHorizontal: 10, width: "90%", fontSize: 18 }} />
            </View>
            <Editor saveData={saveData} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    editor: {
        backgroundColor: "black",
    },
    rich: {
        minHeight: 300,
        flex: 4,
        paddingHorizontal: 20,
        fontSize: 18
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    buttonBack: {
        backgroundColor: "#E9897E",
        width: 50, height: 50,
        justifyContent: "center", alignItems: "center",
        borderRadius: 10, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonSave: {
        backgroundColor: "#E9897E",
        width: 70, height: 50,
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
    const { editor, note } = state;
    const { content, title, idNote } = editor
    return {
        content,
        title,
        idNote,
        notes: note.data
    };
}
const mapDispatchToProps = {
    SetEditorTitle,
    // SaveNote,
    // ResetEditor
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
