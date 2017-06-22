import keyMirror from 'key-mirror'; // enum

const requestStates = keyMirror({
    default: null,
    fetching: null,
    success: null,
    hasError: null
});

export {requestStates}