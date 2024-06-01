/** @format */

import { combineReducers } from 'redux';
import user from './user/Reducer';
import modal from './modal/Reducer';
import table from "./table/Reducer";
export default combineReducers({ user, modal, table });
