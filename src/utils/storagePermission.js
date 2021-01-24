import {
    PermissionsAndroid
} from "react-native"

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "NYATET Storage Permission",
                message:
                    "NYATET needs access to your storage",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the storage");
        } else {
            console.log("storage permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export default requestStoragePermission