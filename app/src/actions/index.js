export const setLevel = niveau => {
  return {
    type: 'SET_LEVEL',
    niveau,
  };
};

export const setCurrent = slug => {
  return {
    type: 'SET_CURRENT',
    slug,
  };
};

export const setSelection = text => {
  return {
    type: 'SET_SELECTION',
    text,
  };
};

export const setComment = (selected, comment) => {
  return {
    type: 'SET_COMMENT',
    selected,
    comment,
  };
};

export const selectComment = comment => {
  return {
    type: 'SELECT_COMMENT',
    comment,
  };
};

export const setLoggedIn = user => {
  return {
    type: 'SET_LOGGED_IN',
    user,
  };
};
