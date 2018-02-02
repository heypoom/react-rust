import {all} from 'redux-saga/effects'
import storage from 'redux-persist/lib/storage'
import {persistCombineReducers} from 'redux-persist'

import app, {appWatcherSaga} from './app'
import todo from './todo'

const config = {key: 'root', storage}

export const reducers = persistCombineReducers(config, {app, todo})

export function* rootSaga() {
  yield all([appWatcherSaga()])
}
