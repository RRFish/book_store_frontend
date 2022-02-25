function setUserToken(token){
  return {type:"tokenChange", token}
}

function setUserInfo(userInfo){
  return {type:"userInfoChange", userInfo}
}

export {
  setUserToken,
  setUserInfo
}