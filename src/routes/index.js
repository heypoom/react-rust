import React from 'react'
import {lifecycle} from 'recompose'

import wasm from '../main.rs'

const Landing = () => <div>Hello</div>

const enhance = lifecycle({
  async componentWillMount() {
    const lib = await wasm
    const result = lib.hello()

    console.log('->', result)
    console.log('Hello?', window.localStorage.getItem(lib.MY_KEY))
  },
})

export default enhance(Landing)
