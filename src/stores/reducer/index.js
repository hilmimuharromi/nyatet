import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import note from "./note"
import editor from "./editor"
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: [
    //     'FormMateri',
    // ],
    timeout: 2000
};

const reducers = combineReducers({
    note,
    editor
});

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;