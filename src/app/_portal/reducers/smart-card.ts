

export const smartCard = (state = [], action) => {
    switch (action.type) {
        case 'CARD_INSERTED':
            return [...state, action.payload];
        case 'CARD_REMOVED':
            return [...state, action.payload];


        default:
            return state;
    }
}