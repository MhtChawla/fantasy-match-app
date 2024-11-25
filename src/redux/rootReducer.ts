import { combineReducers } from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';

import matchdataReducer from './slices/matchdata';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['matchdata'],
};

const rootReducer = combineReducers({
    matchdata: matchdataReducer,
});

export { rootPersistConfig, rootReducer };

