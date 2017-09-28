const stories = (
  state = {
    niveau: 2,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return Object.assign({}, state, {
        niveau: action.niveau,
      });
    case 'SET_CURRENT':
      return Object.assign({}, state, {
        article: action.slug,
      });
    case 'SET_SELECTION':
      return Object.assign({}, state, {
        selected: action.text,
      });
    case 'SELECT_COMMENT':
      return Object.assign({}, state, {
        selectedAnnotation: action.comment,
      });
    case 'SET_COMMENT':
      return Object.assign({}, state, {
        comments: [
          ...state.comments,
          {
            comment: action.comment,
            text: action.selected,
          },
        ],
        selected: '',
      });
    case 'SET_LOGGED_IN':
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
};

export default stories;
