import React from 'react';
import ActivitiesList from '../activitieslist/ActivitiesList'
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
            <Link to='/activities' id='link'>Activities | </Link>{' '}
            <Link to='/foodhome' id='link'>Food</Link>

            <Route path='/activities' component={() => <ActivitiesList />} />
            <Route path='/foodhome' component={() => <FoodHome />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default Home;
