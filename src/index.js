import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import App from './components/App'

if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

  const render = Comp => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById('root')
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./components/App', () => {
      render(require('./components/App').default)
    })
  }
}

export default App

