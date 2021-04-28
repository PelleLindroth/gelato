import * as API from '../../api'

export const loginUser = credentials => async dispatch => {
  const { email, password } = credentials
  const response = await API.loginUser(email, password)

  if (response.success) {
    API.setTokenInLocalStorage(response.user.token)
    dispatch({ type: 'SET_USER', payload: response.user })
    return true
  } else {
    return false
  }
}