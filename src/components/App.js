import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-static'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'react-emotion'

import Routes from 'react-static-routes'

import createStore from '../ducks'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)

const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        color: #555;
      }

      h1, h2 {
        font-weight: 300;
      }
    `
  },
})

export default enhance(App)
