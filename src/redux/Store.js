import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';


const store = configureStore({
    reducer:{
        user:userReducer
    }
})

export default store;


export const server ='https://course-app-backend-nu.vercel.app/api/v1'