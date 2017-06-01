import React from 'react'
import axios from 'axios'
import localforage from 'localforage'
import { Redirect } from 'react-router'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.handleEmailFormOnChange = this.handleEmailFormOnChange.bind(this)
    this.handlePasswordFormOnChange = this.handlePasswordFormOnChange.bind(this)
    this.login = this.login.bind(this)
  }

  login () {
    const {
      email, password
    } = this.state
    axios.post('http://localhost:3000/auth/sign_in', {
      email, password
    })
    .then(function (response) {
      localforage.setItem('appName', JSON.stringify({
        'access-token': response.headers['access-token'],
        'uid': response.headers.uid,
        'expiry': response.headers.expiry,
        'client': response.headers.client,
        'token-type': response.headers['token-type']
      }))
    })
    .then(() => this.setState({ redirect: true }))
    .then(() => {this.props.changeLogin()})
    .catch(function (error) {
      console.log(error)
    })
  }

  handleEmailFormOnChange (e) {
    // console.log(e.target.value);
    this.setState({ email: e.target.value })
  }

  handlePasswordFormOnChange (e) {
    // console.log(e.target.value);
    this.setState({ password: e.target.value })
  }

  render () {
    const login = this.login
    const { redirect } = this.state

     if (redirect) {
       return <Redirect to='/home' />
     }

     if (localforage.getItem('appName')) {
       <Redirect to='/home' />
     }

    return (
      <div>
        <h2 id="login-header">Welcome back!</h2>
        <img src="http://i.imgur.com/eXvFve8.png" />
        <form onSubmit={(event) => {
          event.preventDefault()
          login()
        }}>

          <input id="auth-input" autoFocus type='text' onChange={this.handleEmailFormOnChange} value={this.state.email} placeholder='Email: ' />< br />

          <input id="auth-input" type='password' onChange={this.handlePasswordFormOnChange} value={this.state.password} placeholder='Password: ' />< br />< br />

          <button id="login-submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default Login
