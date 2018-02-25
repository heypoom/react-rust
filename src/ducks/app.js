import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from './helper'

export function* appWatcherSaga() {}

const initial = {}

export default createReducer(initial, state => ({}))
