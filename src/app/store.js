import { configureStore, } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import logger from 'redux-logger'
import movieReducer from "../features/movies/moviesSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
        serializableCheck: false, 
    }).concat(logger)
});
