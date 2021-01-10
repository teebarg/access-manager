import client from './api-client'

const localStorageKey = '__user_token__'
const localStorageId = '__user_id__'

function handleUserResponse({id, secret}) {
  window.localStorage.setItem(localStorageKey, secret)
  window.localStorage.setItem(localStorageId, id)
  return secret
}

function getUser() {
  const token = getToken()
  if (!token) {
    return Promise.resolve(null)
  }
  return client('users').catch(error => {
    logout()
    return Promise.reject(error)
  })
}

function login({email, password}) {
  return client('users', {body: {email, password}}).then(handleUserResponse)
}

function register({username, password}) {
  return client('register', {body: {username, password}}).then(
    handleUserResponse,
  )
}

function logout() {
  window.localStorage.removeItem(localStorageKey)
  window.localStorage.removeItem(localStorageId)
  return client('logout').then(() => true).catch(err =>alert(err))
}

function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

export {login, register, logout, getToken, getUser}