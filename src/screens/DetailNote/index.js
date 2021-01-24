import React, { useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, BackHandler } from "react-native"
import { connect } from 'react-redux';
import HTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/MaterialIcons';
import getWidth from "~/utils/getWidth"
import { SetEditorData } from "~/stores/action"

const DetailNote = ({ navigation, data, SetEditorData }) => {
    const contentWidth = useWindowDimensions().width;

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
            <View style={styles.top}>
                <Text style={styles.textTitle}>{data.title}</Text>
            </View>
            <ScrollView style={styles.main}>
                <HTML source={{ html: data.content ? data.content : "<div></div>" }} contentWidth={contentWidth} />
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log(data)
                        SetEditorData(data)
                        navigation.push("AddNote")
                    }}
                >
                    <Icon name="edit" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    top: {
        marginVertical: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        width: getWidth(90),
        borderBottomWidth: 1,
        borderColor: "#BDBDBD",
    },
    textTitle: {
        fontSize: 18
    },
    main: {
        flex: 4,
        paddingHorizontal: 15,
        marginBottom: 10,
        width: getWidth(100)
    },
    bottom: { justifyContent: "flex-end", alignContent: "flex-end", alignItems: "flex-end", padding: 10, height: 70, width: getWidth(90) },
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
    },
    a: {
        fontWeight: "bold",
        color: "purple",
    },
    div: {
        fontFamily: "monospace",
    },
    p: {
        fontSize: 30,
    },
    image: {
        width: 400,
        height: 1000
    }
})

const mapStateToProps = state => {
    const { note } = state;
    const { current } = note
    return {
        data: current
    };
}
const mapDispatchToProps = {
    SetEditorData
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailNote);