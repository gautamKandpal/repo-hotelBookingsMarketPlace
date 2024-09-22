// 1. create user reducer function
//   {type:"LOGGGED_IN_USER",payload:{name: "abc",role:"qaz"}}
export const authReducer = (state = { name: "abc", role: "qaz" }, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        ...action.payload, // Spread the payload to merge it correctly into the state
      };
    case "LOGOUT":
      // return action.payload;
      return {};

    default:
      return state;
  }
};
