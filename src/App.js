import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Profile from './Components/ProfilePage/Profile';
import Service from './Components/ProfilePage/Service';
import Item from './Components/ItemPage/Item';
import Welcome from './Components/Welcome/Welcome';
import User from './Components/ProfilePage/User';
import Report from './Components/ProfilePage/Report';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: "All Deals",
      filter: ""
    };

  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact strict component={HomePage} />
            <Route name="category" path="/category/:item" component={HomePage} />
            <Route path="/service" component={Service} />
            <Route path="/profile" component={Profile} />
            <Route path="/report" component={Report} />
            <Route path="/user" component={User} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/item/:item" component={Item} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
