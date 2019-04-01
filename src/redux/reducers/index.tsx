import {combineReducers} from 'redux'

import header from './header'
import home from './home'
import todos from './todos'
import todoItem from './todoItem'

export default combineReducers({header,home,todos,todoItem})
