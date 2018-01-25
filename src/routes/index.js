import React, {Component} from 'react'
import styled from 'react-emotion'

import wasm from '../main.rs'

const Container = styled.div`
  padding: 2em 4em;
`

class Landing extends Component {
  state = {secretKey: '', secretMessage: ''}

  async componentWillMount() {
    const lib = await wasm

    const secretKey = localStorage.getItem(lib.SECRET_KEY)

    let secretMessage = lib.secret()
    this.setState({secretKey, secretMessage})
  }

  render = () => (
    <Container>
      <h1>Knock, Knock. {this.state.secretKey}</h1>
      <h2>{this.state.secretMessage}</h2>
    </Container>
  )
}

export default Landing
