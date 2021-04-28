import axios from 'axios'
const API = axios.create({
  baseURL: '/api/v1'
})

export const registerUser = async user => {
  try {
    const { name, email, password } = user

    const response = await API.post('/register', {
      name,
      email,
      password
    })

    return response.data
  } catch (err) {
    return { success: false }
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('./auth', {
      email,
      password
    })

    return response.data
  } catch (err) {
    return false
  }
}

export const getUserByToken = async token => {
  try {
    const response = await API.get('./me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (err) {
    return false
  }
}

export const setTokenInLocalStorage = token => {
  localStorage.setItem('token', token)
}

export const getUserToken = () => {
  return localStorage.getItem('token')
}

export const removeUserToken = () => {
  localStorage.removeItem('token')
}

export const getMixes = async () => {
  try {
    const response = await API.get('./mixes')
    return response.data
  } catch (err) {
    return false
  }
}

export const getFlavours = async () => {
  try {
    const response = await API.get('./flavours')
    return response.data
  } catch (err) {
    return false
  }
}