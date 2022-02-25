import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from "./views/Login.js"
import { Book } from "./views/Book.js"
import { AppBar } from "./views/AppBar.js"
import { Provider } from "react-redux"
import { userInfoManage } from './utils/loginManage.js'
import { setOperatePage } from './actions/router.js'
import store from "./store"

import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      operatePage: ""
    }

    this.checkIsLogin()
    this.setIsLogin = this.setIsLogin.bind(this)
    store.subscribe(()=>{
      const routerReducer = store.getState().routerReducer
      this.setState({
        operatePage: routerReducer.operatePage
      })
    })
    
  }

  async checkIsLogin(){
    const haveToken = await userInfoManage()
    const storeState = store.getState()    
    const userInfo = storeState.userInfo    
    console.log("userInfo", userInfo)
    this.setIsLogin(haveToken)

  }

  setIsLogin(isLogin){
    this.setState({
      isLogin
    })
    if(isLogin){
      store.dispatch(setOperatePage('book')) 
    }else{
      store.dispatch(setOperatePage('login'))
    }
  }

  getAppJsx(){
    const routerReducer = store.getState().routerReducer

    switch(routerReducer.operatePage){
      case "login":
        return <Login onLogin={this.setIsLogin}/>      

      case "book":
        return (<div>
          <AppBar onLogoutClick={this.setIsLogin}/>
          <Book/>
        </div>)

      default:
        return <div>頁面不存在</div>
    }
  }

  render(){
    return (
      <div>
        {this.getAppJsx()}
      </div>
    )
  }
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)