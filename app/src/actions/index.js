export const setLevel = niveau => {
  return {
    type: 'SET_LEVEL',
    niveau
  }
}

export const setCurrent = slug => {
  return {
    type: 'SET_CURRENT',
    slug
  }
}
