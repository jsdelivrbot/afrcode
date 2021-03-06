import axios from 'axios'
import { getAuthentication } from '../security/securityContext'

const onFulfilled = config => {
  let auth = getAuthentication()
  if (auth && auth.isUserAuthenticated) {
    let { tokenJwt } = auth
    config.headers['Authorization'] = `Bearer ${tokenJwt}`
  }
  return config
}

const onRejected = err => Promise.reject(err)

axios.interceptors.request.use(onFulfilled, onRejected)
