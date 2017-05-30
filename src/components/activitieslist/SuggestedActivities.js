import React from 'react'
import axios from 'axios'
import localforage from 'localforage'

class SuggestedActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getMeetups()
  }

  getMeetups() {
    console.log('GETTING MEETUPS!!');
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/activities/meetups',
        headers: JSON.parse(authInfo)
      }).then((response) => {
        console.log('response here', response)
        this.setState({
          results: response.data
        })
      })
    })
  }

  render() {
    console.log('state.results here', this.state.results)

    return (
      <div>
        <h2>COOL EVENTS HERE:</h2>
        <div className="meetup-results">
          {
            this.state.results.map((item) => {
              if (item.venue) {
                return (
                    <p className="meetup-items">
                    <b><a href={item.link}>{item.name}</a></b><br />
                    Organized by: {item.group.who}<br />
                    Location: {item.venue.name}, {item.venue.address_1}<br />
                  </p>
                )
              } else {
                return (
                    <p className="meetup-items">
                    <b><a href={item.link}>{item.name}</a></b><br />
                    Organized by: {item.group.who}<br />
                    Please refer to the meetup page for location details!<br />
                  </p>
                )
              }
            })
          }
        </div>
      </div>
    );
  }

}

export default SuggestedActivities;
