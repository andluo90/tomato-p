import * as React from 'react';

import {Router, Route} from "react-router-dom";
import {createBrowserHistory} from 'history'

import {Provider} from 'react-redux'
import store from './redux/store'
import './App.scss';

import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

const history = createBrowserHistory({basename: 'tomato-p'});

class App extends React.Component {
  public render() {

    return (
      <Provider store={store}>
          <Router history={history}>
              <div>
                  <Route exact={true} path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
              </div>
              
          </Router>
          
      </Provider>
        
    )
  }
}



export default App;
