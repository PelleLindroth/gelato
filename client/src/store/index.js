import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user'
import mixes from './reducers/mixes'
import flavours from './reducers/flavours'
import { composeWithDevTools } from 'redux-devtools-extension';

const setupStore = () => {
  const store = createStore(
    combineReducers({
      user,
      mixes,
      flavours
    }),
    composeWithDevTools(applyMiddleware(thunk))
  )

  return store
}

export default setupStore
