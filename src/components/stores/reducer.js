export const initialState = {
  bills: [],
};
var i = 1;
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDBILL":
      // console.log("bro", action.payload.payLoad.description);
      return {
        ...state,
        bills: [
          ...state.bills,
          {
            id: i++,
            description: action.payload.payLoad.description,
            category: action.payload.payLoad.category,
            amount: action.payload.payLoad.amount,
            date: action.payload.payLoad.date,
          },
        ],
      };
    case "DELBILL":
      return {
        ...state,
        bills: state.bills.filter((val, idx) => {
          return val.id !== action.payload.payLoad;
        }),
      };

    case "EDITBILL":
      console.log("In edit", action.payload.payLoad);
      return {
        ...state,
        // bills: state.bills.filter((val, idx) => {
        //   return val.id !== action.payload.payLoad.id;
        // }),
        // bills: [...state.bills, action.payload.payLoad],
        bills: state.bills.map((val, idx) => {
          if (val.id === action.payload.payLoad.id) {
            return (val = action.payload.payLoad);
          }
        }),
      };

    default:
      return state;
  }
};
export default rootReducer;
