import { Dimensions } from "react-native"

const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

export default wp