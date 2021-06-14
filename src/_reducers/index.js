import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { viewalltodos} from './viewalltodos.reducer';
// import { spliceriskfields} from './spliceriskfields.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,  
  viewalltodos,
  // spliceriskfields
});

export default rootReducer;