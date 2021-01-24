const initialState = {
    data: [],
    current: "",
}

export default function EditorReducer(state = initialState, action) {

    if (action.type === 'SET_DATA_NOTE') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SAVE_NOTE') {
        let data = action.payload
        let oldData = state.data.sort((a, b) => a.idNote > b.idNote)
        let newData = []
        if (data.idNote) {
            newData = oldData.map((item) => {
                return item.idNote === data.idNote ? item = data : item
            })
        }
        if (!data.idNote) {
            if (oldData.length > 0) {
                data.idNote = oldData[oldData.length - 1].idNote + 1
            } else {
                data.idNote = 1
            }
            newData = [...state.data, data]
        }
        return {
            ...state,
            data: newData
        };
    } else if (action.type === 'DELETE_NOTE') {
        return {
            ...state,
            data: state.data.filter((item) => item.idNote !== action.payload)
        };
    } else if (action.type === 'SET_CURRENT_NOTE') {
        return {
            ...state,
            current: action.payload
        };
    }
    return state
}