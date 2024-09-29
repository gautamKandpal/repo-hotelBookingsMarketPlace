let userState;
if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
  console.log("this is from user state", userState);
} else {
  userState = null; //{}
}

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        ...action.payload, // Ensure payload contains necessary fields like token
      };
    case "LOGOUT":
      // Clear state on logout
      //return { ...state, ...action.payload}
      return {};

    default:
      return state;
  }
};
