import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import moment from "moment"
import Icon from 'react-native-vector-icons/FontAwesome';
import getWidth from "~/utils/getWidth"
import displayDate from '~/utils/dispayDate';
const CardNotes = ({ onClickNote, item, DeleteNote, }) => {
    const [current, setCurrent] = useState("")

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <RectButton activeOpacity={1} onPress={() => {
                current.close()
                DeleteNote(item.idNote)
            }
            }>
                <View style={styles.deleteBox}>
                    <Animated.Text style={{ transform: [{ scale: scale }] }}>
                        <Icon name="trash" size={30} color="#fff" />
                    </Animated.Text>
                </View>
            </RectButton >
        );
    };

    return (
        <>
            <View style={styles.mainContainer}>
                <Swipeable ref={(ref) => setCurrent(ref)} renderLeftActions={leftSwipe} rightThreshold={20} >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.cardContainer}
                        onPress={() => onClickNote(item)}
                    >
                        <View style={styles.left}>
                        </View>
                        <View style={{ justifyContent: "space-around", flex: 1, height: "90%" }}>
                            <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                {item.title}
                            </Text>
                            <Text>{displayDate(item.date)}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "red",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        elevation: 4
    },
    cardContainer: {
        width: getWidth(90),
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // marginVertical: 10,
        borderColor: "#E9897E",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    left: {
        width: 30,
        height: 100,
        backgroundColor: "#E9897E",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginRight: 20,
        elevation: 2
    },
    deleteBox: {
        width: getWidth(20),
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        fontSize: 24,
        elevation: 1,
    },

})

export default CardNotes