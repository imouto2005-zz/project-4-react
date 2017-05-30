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
            <Link to='/suggestedactivities' id='link'>Try something new! | </Link>{' '}
            <Link to='/activities' id='link'>Safe choices ftw</Link>

            <Route path='/suggestedactivities' component={() => <SuggestedActivities />} />
            <Route path='/activities' component={() => <ActivitiesList />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default ActivitiesHome;
