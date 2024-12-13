import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slice/dashboardSlice";
import userReducer from "./slice/userSlice";
import headerReducer from "./slice/headerSlice";
import freelancerReducer from "./slice/freelancerSlice";

//Redux Persist
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const persistedReducer = persistReducer(persistConfig, userReducer)

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  user: persistedReducer,
  header: headerReducer,
  freelancer: freelancerReducer,

})


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    serializableCheck: false,
  })
});

let persistor = persistStore(store)

export { store, persistor }
























