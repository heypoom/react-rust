import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-static'
//
import Routes from 'react-static-routes'

import createStore from './ducks'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)

export default App

