import {createReducer} from '@reduxjs/toolkit';

export const courseReducer = createReducer({
    courses:[]
},{
    allCoursesRequest:(state)=>{
        state.loading = true;
    },
    allCoursesSuccess:(state,action)=>{
        state.loading =false;
        state.courses = action.payload;
    },
    allCoursesFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    addToPlayListRequest:(state)=>{
        state.loading = true;
    },
    addToPlayListSuccess:(state,action)=>{
        state.loading =false;
        state.message = action.payload;
    },
    addToPlayListFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearMessage:(state)=>{
        state.message = null;
    },
    clearError:(state)=>{
        state.error = null;
    }
});