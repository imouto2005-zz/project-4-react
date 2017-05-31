import React from 'react';
import SuggestedActivities from './SuggestedActivities'
import ActivitiesList from './ActivitiesList'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class ActivitiesHome extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/suggestedactivities' id='link'><button>I want to go out and meet new people!</button></Link>{' '}
            <Link to='/activities' id='link'><button>Give me the usual</button></Link>

            <Route path='/suggestedactivities' component={() => <SuggestedActivities />} />
            <Route path='/activities' component={() => <ActivitiesList />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default ActivitiesHome;
