import React from 'react';
import { registerApi } from "../apis/login.js"

import { userLoginManage, userInfoManage } from "../utils/loginManage.js"


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerForm:{
        nickname: "",
        account: "",
        password: "",
        passwordRe: "",
      }
    }    

    this.registerHandle = this.registerHandle.bind(this)
    this.backToLogin = this.backToLogin.bind(this)
    this.onRegisterFormChange = this.onRegisterFormChange.bind(this)
  }

  registerHandle(){
    registerApi(this.state.registerForm).then(()=>{
      this.backToLogin()
    })
  }

  backToLogin(){
    this.props.onBack(false)
  }

  onRegisterFormChange(e){
    const registerForm = {...this.state.registerForm}
    const formField = e.target.id
    const value = e.target.value
    if(Object.keys(registerForm).includes(formField)){
      registerForm[formField] = value
    }

    this.setState({
      registerForm: registerForm
    })
  }

  render(){
    const { nickname, account, password, passwordRe } = this.state.registerForm
    return <div className="register">
      <h1>書局管理系統</h1>
      暱稱:<input id="nickname" onChange={this.onRegisterFormChange} value={nickname} type="text" />
      帳號:<input id="account" onChange={this.onRegisterFormChange} value={account} type="text" />
      密碼:<input id="password" onChange={this.onRegisterFormChange} value={password} type="password" />
      密碼確認:<input id="passwordRe" onChange={this.onRegisterFormChange} value={passwordRe} type="password" />
      <div>
        <button onClick={this.registerHandle}>提交</button>
        <button onClick={this.backToLogin}>返回</button>
      </div>
    </div>
  }
}

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loginForm:{
        account: "",
        password: ""
      },
      isRegister: false
    }

    this.loginHandle = this.loginHandle.bind(this)
    this.setIsRegister = this.setIsRegister.bind(this)
    this.onLoginFormChange = this.onLoginFormChange.bind(this)
    this.onPasswordKeyUp = this.onPasswordKeyUp.bind(this)
  }

  async loginHandle(){
    const { account, password } = this.state.loginForm
    await userLoginManage(account, password)
    await userInfoManage()
    this.props.onLogin(true)
    
  }

  setIsRegister(value){
    this.setState({
      isRegister: value
    })
  }

  onLoginFormChange(e){
    const loginForm = {...this.state.loginForm}
    const formField = e.target.id
    const value = e.target.value
    if(Object.keys(loginForm).includes(formField)){
      loginForm[formField] = value
    }

    this.setState({
      loginForm: loginForm
    })
  }  

  onPasswordKeyUp(e){
    if(e.keyCode === 13){
      e.preventDefault()

      this.loginHandle()
    }
  }

  render(){
    if(this.state.isRegister){
      return <Register onBack={this.setIsRegister}/>
    }else{
      const { account, password } = this.state.loginForm
      return (
        <div className="login">
          <h1>書局管理系統</h1>
          帳號:<input id="account" value={account} onChange={this.onLoginFormChange} type="text" />
          密碼:<input id="password" value={password} onKeyUp={this.onPasswordKeyUp} onChange={this.onLoginFormChange} type="password" />
          <div>
            <button onClick={this.loginHandle}>登入</button>
            <button onClick={()=>{this.setIsRegister(true)}}>註冊</button>
          </div>
        </div>)

    }
  }
}

export {
  Login
}