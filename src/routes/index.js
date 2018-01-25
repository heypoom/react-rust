import React from 'react'
import styled, {css} from 'react-emotion'
import {connect} from 'react-redux'

import {getSecret} from '../ducks/app'

const Container = styled.div`
  padding: 2em;
  margin: 2em;

  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 25px;
  background: white;
`

// prettier-ignore
const Header = styled.h1`
  margin: 0;
  margin-bottom: 0.5em;

  ${props => props.big && css`
    font-size: 2.2em;
    font-weight: 400;
  `};
`

const Button = styled.button`
  background: #2d2d30;
  border-radius: 4px;
  border: none;
  box-shadow: rgba(51, 51, 51, 0.6) 0px 4px 20px -2px;
  color: white;
  cursor: pointer;
  font-size: 1.08em;
  outline: none;
  padding: 0.4em 0.8em;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    color: #555;
    background: white;
  }
`

const Landing = ({secret, getSecret}) => (
  <Container>
    <Header>Knock, Knock. {secret.phrase}</Header>
    <Header big>{secret.name}</Header>
    <Button onClick={getSecret}>Reply</Button>
  </Container>
)

const mapStateToProps = state => ({
  secret: state.app.secret,
})

const enhance = connect(mapStateToProps, {getSecret})

export default enhance(Landing)
