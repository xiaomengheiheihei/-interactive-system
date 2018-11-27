import { combineReducers } from 'redux'
import ROOT from './root/reducer'
import PROGRAM_LIST from './progarmList/reducer'

const reducer = combineReducers({
    ROOT,
    PROGRAM_LIST
})

export default reducer