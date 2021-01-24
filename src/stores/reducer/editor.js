const initialState = {
    content: "",
    title: "",
    idNote: ""
}

export default function EditorReducer(state = initialState, action) {

    if (action.type === 'SET_EDITOR_DATA') {
        return {
            ...state,
            content: action.payload.content,
            title: action.payload.title,
            idNote: action.payload.idNote
        };
    } else if (action.type === 'SET_EDITOR_CONTENT') {
        return {
            ...state,
            content: action.payload
        };
    } else if (action.type === 'SET_EDITOR_TITLE') {
        return {
            ...state,
            title: action.payload
        };
    } else if (action.type === 'SET_EDITOR_ID') {
        return {
            ...state,
            idNote: action.payload
        };
    } else if (action.type === 'RESET_EDITOR') {
        return {
            content: "",
            title: "",
            idNote: ""
        };
    }
    return state
}