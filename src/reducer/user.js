const initState = {
  userToken: "",
  userInfo: {}
}

const userReducer = (state=initState, action) =>{
  switch(action.type){
    case "tokenChange":
      return Object.assign({}, state, {
        userToken: action.token
      })
    
    case "userInfoChange":
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })

    default:
      return state;
  }
}

export default userReducer