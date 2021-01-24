const SetEditorContent = (data) => {
    return {
        type: 'SET_EDITOR_CONTENT', payload: data
    };
}

const SetEditorTitle = (data) => {
    return {
        type: 'SET_EDITOR_TITLE', payload: data
    };
}

const SetEditorId = (data) => {
    return {
        type: 'SET_EDITOR_ID', payload: data
    };
}

const SetEditorData = (data) => {
    return {
        type: 'SET_EDITOR_DATA', payload: data
    };
}

const ResetEditor = () => {
    return {
        type: 'RESET_EDITOR'
    };
}


export {
    SetEditorContent,
    SetEditorTitle,
    SetEditorId,
    SetEditorData,
    ResetEditor
}