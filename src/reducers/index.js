export default (state, action) => {
  switch (action.type) {
    case "CHANGE_TEXT":
		console.log("Change_test reducer")
    //   return Object.assign({}, state, {
	// 	  test: state.test = "updated state"
	//   });
    case "test_button2":
    default:
      return state;
  }
};
