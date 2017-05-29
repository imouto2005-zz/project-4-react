import React from 'react';
import ActivitiesList from '../activitieslist/ActivitiesList'
import FoodList from '../foodlist/FoodList'
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
            <Link to='/food' id='link'>Food</Link>

            <Route path='/activities' component={() => <ActivitiesList />} />
            <Route path='/food' component={() => <FoodList />} />
            {/* <Route path='/logout' component={() => <Logout />} /> */}
          </div>
        </Router>
      </div>
    );
  }

}

export default Home;
