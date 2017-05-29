import React from 'react'
import axios from 'axios'
import localforage from 'localforage'
import { Redirect } from 'react-router'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      redirect: false
    }
    this.handleEmailFormOnChange = this.handleEmailFormOnChange.bind(this)
    this.handlePasswordFormOnChange = this.handlePasswordFormOnChange.bind(this)
    this.handleConfirmPasswordFormOnChange = this.handleConfirmPasswordFormOnChange.bind(this)
    this.signup = this.signup.bind(this)
  }

  signup () {
    const {
      email, password, confirm_password
    } = this.state

    axios.post('http://localhost:3000/auth', {
      email, password, confirm_password
    })
    .then(function (response) {
      localforage.setItem('appName', {
        'access-token': response.headers['access-token'],
        'uid': response.headers.uid,
        'expiry': response.headers.expiry,
        'client': response.headers.client,
        'token-type': response.headers['token-type']
      })
    })
    .then(() => this.setState({ redirect: true }))
    .catch(function (error) {
      console.log(error)
    })
  }

  handleEmailFormOnChange (e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordFormOnChange (e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPasswordFormOnChange (e) {
    this.setState({ confirm_password: e.target.value })
  }

  render () {
    const signup = this.signup
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/activities' />
    }

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          signup()
        }}>
          <label>Email:</label>
          <input type='text' placeholder='Email' onChange={this.handleEmailFormOnChange} value={this.state.email} />< br />
          <label>Password:</label>
          <input type='password' placeholder='Password' onChange={this.handlePasswordFormOnChange} value={this.state.password} />< br />
          <label>Password Confirmation:</label>
          <input type='password' placeholder='Password Confirmation' onChange={this.handleConfirmPasswordFormOnChange} value={this.state.confirm_password} />< br />< br />
          <button>Submit</button>
        </form>
      </div>
    )
  }

}

export default Signup
