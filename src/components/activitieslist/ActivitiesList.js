import React from 'react'
import ActivityItem from './ActivityItem'
import axios from 'axios'
import localforage from 'localforage'

class ActivitiesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: [],
      activityForm: ''
    }
    this.handleActivityFormOnChange = this.handleActivityFormOnChange.bind(this)
    this.fetchActivities = this.fetchActivities.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.removeActivity = this.removeActivity.bind(this)
  }

  componentDidMount () {
    this.fetchActivities()
  }

  fetchActivities () {
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/activities',
        headers: JSON.parse(authInfo)
      })
    }).then((response) => {
      console.log(response)
      this.setState({ activities: response.data })
    })
  }

  addActivity () {
    const newactivity = this.state.activityForm
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/activities',
        headers: JSON.parse(authInfo),
        data: { data: newactivity }
      })
    }).then((response) => {
      console.log(response)
      this.setState({ activityForm: '' })
      this.fetchActivities()
    })
  }

  removeActivity(id) {
    console.log(`we are gonna delete this item ${id}`)
    let url = 'http://localhost:3000/activities/' + id
    console.log(url);
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'DELETE',
        url: url,
        headers: JSON.parse(authInfo)
      })
    })
    .then((response) => {
      this.fetchActivities()
    })
  }

  handleActivityFormOnChange (e) {
    console.log(e.target.value);
    this.setState({ activityForm: e.target.value })
  }

  randPick(e) {
    let randomVal = Math.floor(Math.random() * this.state.activities.length);
    document.getElementById('chosen-activity').innerHTML=this.state.activities[randomVal].description;
  }

  render () {
    const addActivity = this.addActivity
    const removeActivity = this.removeActivity
    return (
      <div className='activity-list'>
        <h2>YOUR FUN ACTIVITIES</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          addActivity()
        }}>
          <input type='text' value={this.state.activityForm} onChange={this.handleActivityFormOnChange} placeholder='Add your own fun activity here!' />
          <button>Submit</button>
        </form>

        <div className='activities'>
            {
              this.state.activities.map((item) => {
                  return (
                    <ActivityItem
                      activity={item.description}
                      key={item.id}
                      id={item.id}
                      onClickDelete={ removeActivity }
                    />
                  )
              })
            }
              <button id="rand-btn" onClick={(e) => this.randPick(e)}> RANDOM SELECT </button>
              <h2>Your fun activity is:</h2>
              <h3 id="chosen-activity"></h3>
        </div>
      </div>
    )
  }
}

export default ActivitiesList
