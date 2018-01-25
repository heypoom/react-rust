import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from './helper'
import wasm from '../main.rs'

export const GET_SECRET = 'GET_SECRET'
export const STORE_SECRET = 'STORE_SECRET'

export const getSecret = Creator(GET_SECRET)
export const storeSecret = Creator(STORE_SECRET)

export function* getSecretSaga() {
  const lib = yield wasm

  const name = lib.secret()
  const phrase = localStorage.getItem(lib.SECRET_KEY)

  yield put(storeSecret({name, phrase}))
}

export function* appWatcherSaga() {
  yield takeEvery(GET_SECRET, getSecretSaga)
}

const initial = {
  secret: {},
}

export default createReducer(initial, state => ({
  [STORE_SECRET]: secret => ({
    secret,
  }),
}))
