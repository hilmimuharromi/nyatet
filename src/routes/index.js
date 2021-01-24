import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddNoteScreen from "~/screens/AddNote"
import EmptyDataScreen from "~/screens/EmptyData"
import ListNotesScreen from "~/screens/ListNotes"
import DetailNoteScreen from "~/screens/DetailNote"
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        // initialRouteName={data.length > 0 ? "ListNotes" : "EmptyData"}
        >

            <Stack.Screen name="ListNotes" component={ListNotesScreen} />
            <Stack.Screen name="EmptyData" component={EmptyDataScreen} />
            <Stack.Screen name="AddNote" component={AddNoteScreen} />
            <Stack.Screen name="DetailNote" component={DetailNoteScreen} />

        </Stack.Navigator>
    )
}

export default Routes