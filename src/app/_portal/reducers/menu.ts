const details = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return Object.assign({}, state, { toggle: !state.toggle });

        default:
            return state;
    }
}

export const menu = (state = [], action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return state.map(meni => details(meni, action));


        default:
            return state;
    }
}