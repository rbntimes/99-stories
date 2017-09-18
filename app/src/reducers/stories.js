const stories = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return Object.assign({}, state, {
        niveau: Math.ceil(action.niveau / 10),
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
