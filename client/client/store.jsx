import { createStore } from 'redux'
import userReducer from './reducers/UserReducers.jsx'

const store = createStore(userReducer);
export default store;