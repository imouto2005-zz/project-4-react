import React from 'react';
import ActivitiesHome from '../activitieslist/ActivitiesHome'
import FoodHome from '../foodlist/FoodHome'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class Home extends React.Component {

  render() {
    return (
      <div>
          <div>
            <Link to={'/activitieshome'} id='link'><button id="activity-home">WHAT TO DO?</button></Link>
            <Link to='/foodhome' id='link'><button id="food-home">WHERE TO EAT?</button></Link>

            {/* <Route path='/activitieshome' component={() => <ActivitiesHome />} /> */}
            {/* <Route path='/foodhome' component={() => <FoodHome />} /> */}
          </div>
      </div>
    );
  }

}

export default Home;
