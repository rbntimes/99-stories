const stories = (
  state = {
    niveau: 2,
    article: 'stijloefeningen-17-geert-wilders',
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
    default:
      return state;
  }
};

export default stories;
