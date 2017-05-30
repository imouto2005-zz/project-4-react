import React from 'react';
import ActivitiesHome from '../activitieslist/ActivitiesHome'
import FoodHome from '../foodlist/FoodHome'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Home extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/activitieshome' id='link'>Activities | </Link>{' '}
            <Link to='/foodhome' id='link'>Food</Link>

            <Route path='/activitieshome' component={() => <ActivitiesHome />} />
            <Route path='/foodhome' component={() => <FoodHome />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default Home;
