import React from 'react'
import {lifecycle} from 'recompose'

import wasm from '../main.rs'

const Landing = () => <div>Hello</div>

const enhance = lifecycle({
  async componentWillMount() {
    const lib = await wasm
    console.log('WebAssembly Module:', lib)

    const result = lib.hello()

    console.log('->', result)
    console.log('Knock, Knock?', window.localStorage.getItem(lib.SECRET_KEY))
  },
})

export default enhance(Landing)
