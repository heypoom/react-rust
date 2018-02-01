import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, Switch} from 'react-static'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'react-emotion'

import Landing from '../routes'
import NotFound from '../routes/404'

import createStore from '../ducks'

const store = createStore()

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        color: #555;
        background: rgb(251, 252, 255);
      }

      h1, h2 {
        font-weight: 300;
      }
    `
  },

  componentDidCatch(err) {
    console.warn('Error Caught:', err)
  },
})

export default enhance(App)
