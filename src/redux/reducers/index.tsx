import {combineReducers} from 'redux'

import header from './header'
import home from './home'
import todos from './todos'

export default combineReducers({header,home,todos})
