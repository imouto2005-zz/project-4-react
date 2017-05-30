import React, { Component } from 'react'
import ActivitiesList from './components/activitieslist/ActivitiesList'
import FoodList from './components/foodlist/FoodList'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import localforage from 'localforage'
import axios from 'axios'
import './App.css'
import Home from './components/home/Home'
import { Redirect } from 'react-router'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
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
      this.setState({ redirect: true })
      console.log('redirected')
    })
  }

  render () {
    const { redirect } = this.state

    return (
      <div className='App'>
        <div className='App-header'>

          <h2 id="main-header"><i>DOUSHIO~~</i></h2>
        </div>
        <Router>
          <div>
            { redirect && <Redirect to='/login' /> }
            <Link to='/login' id='link'>Login | </Link>{' '}
            <Link to='/signup' id='link'>Sign Up |</Link>{' '}
            <button onClick={(e) => this.logout(e)}> Log Out </button>
            <br /> <br />

            <Route path='/login' component={() => <Login />} />
            <Route path='/signup' component={() => <Signup />} />
            <Route path='/activities' component={() => <ActivitiesList />} />
            <Route path='/home' component={() => <Home />} />
            {/* <Route path='/logout' component={() => <Logout />} /> */}
          </div>
        </Router>

        {/* <ActivitiesList /> */}
      </div>
    )
  }
}

export default App
