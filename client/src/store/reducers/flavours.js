const flavours = (state = [], action) => {
  switch (action.type) {
    case 'SET_FLAVOURS':
      return action.payload
    default:
      return state
  }
}

export default flavours