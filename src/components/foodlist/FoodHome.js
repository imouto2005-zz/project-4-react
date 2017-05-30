import React from 'react';
import FoodMap from './FoodMap'
import FoodList from './FoodList'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class FoodHome extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/foodmap' id='link'>Try something new! | </Link>{' '}
            <Link to='/food' id='link'>Safe choices ftw</Link>

            <Route path='/foodmap' component={() => <FoodMap />} />
            <Route path='/food' component={() => <FoodList />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default FoodHome;
