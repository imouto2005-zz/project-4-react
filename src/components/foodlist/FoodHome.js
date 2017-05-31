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
            <Link to='/foodmap' id='link'><button>Try something new!</button></Link>{' '}
            <Link to='/food' id='link'><button>Safe choices ftw</button></Link>

            <Route path='/foodmap' component={() => <FoodMap />} />
            <Route path='/food' component={() => <FoodList />} />
          </div>
        </Router>
      </div>
    );
  }

}

export default FoodHome;
