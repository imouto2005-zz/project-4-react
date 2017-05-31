import React, { Component } from 'react'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import ActivitiesList from './components/activitieslist/ActivitiesList'
import localforage from 'localforage'
import axios from 'axios'
import './App.css'
import Home from './components/home/Home'
import { Redirect } from 'react-router'

import ActivitiesHome from './components/activitieslist/ActivitiesHome'
import FoodHome from './components/foodlist/FoodHome'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectLogout: false
    }
    this.logout = this.logout.bind(this)
  }

  logout () {
    // You must pass in uid, client, and access-token in the request headers.
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'DELETE',
        url: 'http://localhost:3000/auth/sign_out',
        headers: JSON.parse(authInfo)
      })
    })
    .then(() => {
      localforage.removeItem('appName')
      console.log('logged out')
    })
    .then(() => {
      this.setState({ redirectLogout: true })
      console.log('redirected')
    })
  }

  render () {
    const { redirectLogout } = this.state

    return (
      <div className='App'>
        <div className='App-header'>

          <h2 id="main-header">doushio~?</h2>
        </div>
        <Router>
        <div>
          <div>
          { redirectLogout && <Redirect to='/login' /> }
          <Link to='/login' id='link'><button id="auth-button">Login</button></Link>{' '}
          <Link to='/signup' id='link'><button id="auth-button">Sign Up</button></Link>{' '}
          <button id="auth-button" onClick={(e) => this.logout(e)}> Log Out </button>
          <br /> <br />
          </div>
          <div>
          <Route path='/login' component={() => <Login />} />
          <Route path='/signup' component={() => <Signup />} />
          <Route exact path='/home' component={Home} />

          {/* <Route path='/activitieshome' render={() => <ActivitiesHome />} /> */}
          <Route exact path='/activitieshome' component={ActivitiesHome} />
          <Route path='/foodhome' render={() => <FoodHome />} />

          {/* <Route path='/logout' component={() => <Logout />} /> */}
          </div>
        </div>
        </Router>
      </div>
    )
  }
}

export default App
