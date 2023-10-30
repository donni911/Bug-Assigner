const toast = (store) => (next) => (action) => {
  if (action.type === "error") {
    console.log("Toestify:", action.payload.message);
  } else {
    return next(action);
  }
};

export default toast;

// currying
// n => 1
