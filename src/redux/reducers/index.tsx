import {combineReducers} from 'redux'

import header from './header'
import home from './home'
import todos from './todos'
import todoItem from './todoItem'
import tomatos from './tomatos'

export default combineReducers({header,home,todos,todoItem,tomatos})
