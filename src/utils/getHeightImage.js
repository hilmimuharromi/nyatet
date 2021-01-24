import getWidth from "./getWidth"
const getHeightImage = (w, h) => {
    let original = h / w
    return original * getWidth(80)
}

export default getHeightImage