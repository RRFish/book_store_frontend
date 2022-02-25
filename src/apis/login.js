import bookStoreResquest from '../utils/request.js'
import { passwordEncrypt } from "../utils/passwordCrypto.js"

async function loginApi({account, password}){
  const passwordCrypto = await passwordEncrypt(password)
  const res = await bookStoreResquest.post("user/login", {
    account: account,
    password: passwordCrypto
  })

  return res
}

async function userInfoApi(){
  const res = await bookStoreResquest.post("user/userInfo")

  return res
}

async function registerApi(data){
  const res = await bookStoreResquest.post("user/register", data)
  return res
}

async function logoutApi(){
  await bookStoreResquest.post("user/logout")
}

export {
  loginApi,
  registerApi,
  logoutApi,
  userInfoApi
}