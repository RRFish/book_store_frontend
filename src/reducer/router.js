const initState = {
  operatePage: "login"
}

const routerReducer = (state=initState, action) =>{
  switch(action.type){
    case "pageChange":
      return Object.assign({}, state, {
        operatePage: action.page
      })

    default:
      return state;
  }
}

export default routerReducer