const initState = {
    allDrinks: [],
    expendedDrink: {},
    daysDrink: [
        [], [], [], [], [], [], []
    ],
};

export function drinksReducer(state = initState, action) {

    switch (action.type) {
        case "SET_ALL_DRINKS":
            console.log(action.payload.allDrinks);
            return { ...state, allDrinks: action.payload.allDrinks };
        case "SET_EXPENDED_DRINK":
            return { ...state, expendedDrink: action.payload.expendedDrink[0] };
        case "FOLLOW":
            const index = state.allDrinks.findIndex(drink => drink.idDrink === action.payload.idDrink);
            console.log("the index is: " + action.payload.idDrink);
            return {
                ...state, allDrinks: [...state.allDrinks.slice(0, index),
                { ...state.allDrinks[index], follow: action.payload.follow, }
                    , ...state.allDrinks.slice(index + 1)]
            }
        case "SCHEDULE_FROM_STORAGE": {
                let daysDrinkStorage = localStorage.getItem("daysDrink");
                console.log("my days drink is " + daysDrinkStorage);
               // return {...state}
               return (daysDrinkStorage == null ?  {...state} :  {...state, daysDrink: JSON.parse(daysDrinkStorage) });
        }
        case "DRINK_TO_DAY": {
            const dayIndex = action.payload.day;
            const idDrink = action.payload.idDrink
            return {
                ...state, daysDrink: [...state.daysDrink.slice(0, dayIndex),
                [...state.daysDrink[dayIndex], idDrink],
                ...state.daysDrink.slice(dayIndex + 1)]
            }
        }
        case "DELETE_DRINK_FROM_DAY": {
            const dayIndex = action.payload.day;
            const drinkIndex = state.daysDrink[dayIndex].findIndex(drink => drink === action.payload.idDrink);
            return {
                ...state, daysDrink: [...state.daysDrink.slice(0, dayIndex),
                [...state.daysDrink[dayIndex].filter((el, index) => index !== drinkIndex)],
                ...state.daysDrink.slice(dayIndex + 1)]
            }
        }
        case "FETCH_ERROR":
            console.log(action.payload);
            return initState;
        default:
            break;
    }

    return state;
}

/*
delete all
case "UNFOLLOW_ALL":
    let unfollowAll = state.allCoins.map((c) => {
        c.follow = false;
        return c;
    })

    localStorage.clear();
     return { ...state, allCoins: [...unfollowAll] };
*/