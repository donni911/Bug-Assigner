const logger = (param) => (store) => (next) => (action) => {
  return next(action);
};

export default logger;

// currying
// n => 1
