import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

//Redux
import { Provider } from 'react-redux'
import store from './store'

import { loadUser } from './actions/auth'
import setAuthToken from './utills/setAuthToken';

import './App.css';

if(localStorage.token) {
  console.log('first if')
  setAuthToken(localStorage.token)
}


const App = () => {
  useEffect(() => {
    console.log('second if')
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route component={ Routes } />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;