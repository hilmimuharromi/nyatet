const SetDataNote = (data) => {
    return {
        type: 'SET_DATA_NOTE', payload: data
    };
}

const SaveNote = (data) => {
    return {
        type: 'SAVE_NOTE', payload: data
    };
}

const DeleteNote = (data) => {
    return {
        type: 'DELETE_NOTE', payload: data
    };
}

const SetCurrentNote = (data) => {
    return {
        type: 'SET_CURRENT_NOTE', payload: data
    };
}


export {
    SetDataNote,
    SaveNote,
    DeleteNote,
    SetCurrentNote
}