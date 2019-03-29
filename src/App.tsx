import * as React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Provider} from 'react-redux'
import store from './redux/store'
import './App.scss';

import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

class App extends React.Component {
  public render() {

    return (
      <Provider store={store}>
          <Router>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Router>
          
      </Provider>
        
    )
  }
}



export default App;
