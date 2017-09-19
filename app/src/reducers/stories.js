const stories = (state = { niveau: 1 }, action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return Object.assign({}, state, {
        niveau: action.niveau,
      });
    case 'SET_CURRENT':
      return Object.assign({}, state, {
        article: action.slug,
      });
    default:
      return state;
  }
};

export default stories;
