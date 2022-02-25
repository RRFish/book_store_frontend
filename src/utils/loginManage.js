import { loginApi, userInfoApi, logoutApi } from "../apis/login.js"
import { getCookie, setCookie } from "./cookie.js"
import store from "../store"
import { setUserToken, setUserInfo } from "../actions/user.js"

async function userLoginManage(account, password){
  const res = await loginApi({account, password})
  const token = res.data.data.token
  await store.dispatch(setUserToken(token))
  setCookie("userToken", token)
}

async function userInfoManage(){
  const token = getCookie("userToken")
  if(token){
    await store.dispatch(setUserToken(token))
    setCookie("userToken", token)//延長cookie過期時間
    const res = await userInfoApi()
    await store.dispatch(setUserInfo(res.data.data))
    return true
  }  
  return false
}

async function userLogoutManage(){
  await logoutApi()
  await store.dispatch(setUserToken(""))
  setCookie("userToken", "", -1)
}




export {
  userLoginManage,
  userInfoManage,
  userLogoutManage
}