import moment from "moment"


const displayDate = (date) => {
    const noteDate = moment(date, "DD-MM-YYYY HH:mm:ss")
    const jarak = moment().diff(noteDate, "days")
    let hour = noteDate.format("HH:mm")
    let result = ""
    if (jarak === 0) {
        result = `Hari ini, ${hour}`
    } else if (jarak === 1) {
        result = `kemarin, ${hour}`
    } else {
        result = `${noteDate.format("DD-MM-YYYY HH:mm")}`
    }

    // console.log(jarak, "jarak")
    return result

}

export default displayDate