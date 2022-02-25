import React from 'react';
import { userLogoutManage } from "../utils/loginManage.js"
import { setOperatePage } from '../actions/router.js'
import store from "../store"

class AppBar extends  React.Component{

  constructor(props){
    super(props)

    this.onLogoutClick.bind(this)
  }

  async onLogoutClick(){
    await userLogoutManage()
    store.dispatch(setOperatePage("login"))
    this.props.onLogoutClick(false)
  }

  render(){
    const storeState = store.getState().userReducer
    const userInfo = storeState.userInfo

    return (
    <div className="appbar">
      <h1>書局管理系統</h1>
      <span>
        <h4>使用者:{userInfo.account}</h4> 
        <h4>暱稱:{userInfo.nickname}</h4>
        <button onClick={()=>{this.onLogoutClick()}}>登出</button>
      </span>
    </div>)
  }
}


export {
  AppBar
}