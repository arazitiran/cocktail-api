const initState = {
    allDrinks: [],
    expendedDrink: {},
    daysDrink: [
        [],[],[],[],[],[],[]
    ],
};

export function drinksReducer(state = initState, action) {

    switch (action.type) {
        case "SET_ALL_DRINKS":
            return { ...state, allDrinks: [...action.payload.allDrinks.drinks.slice(0,10)] };
        case "SET_EXPENDED_DRINK":
            return {...state, expendedDrink: action.payload.expendedDrink.drinks[0] };
        case "CHANGE_FOLLOWING":
            const index = state.allDrinks.findIndex(coin => coin.id === action.payload.id)

            return {
                ...state,
                allCoins: [...state.allCoins.slice(0, index), // everything before current post
                {
                    ...state.allCoins[index],
                    follow: action.payload.follow,
                },
                ...state.allCoins.slice(index + 1)] // everything after current post
            }
        case "FETCH_ERROR":
            console.log("bug?"); //action.payload
            return initState;
        case "UNFOLLOW_ALL":
            let unfollowAll = state.allCoins.map((c) => {
                c.follow = false;
                return c;
            })

            localStorage.clear();

            return { ...state, allCoins: [...unfollowAll] };
        default:
            break;
    }

    return state;
}