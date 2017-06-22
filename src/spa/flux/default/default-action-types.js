import keyMirror from 'key-mirror';

const defaultActionTypes = keyMirror({
    setMainView: null,
    setModalKey: null,
    closeModal: null
});

export {defaultActionTypes}