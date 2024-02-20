import {createReducer} from '@reduxjs/toolkit';


export const adminReducer = createReducer({},{
    createCourseRequest:(state)=>{
        state.loading = true;
    },
    createCourseSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    createCourseFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    deleteCourseRequest:(state)=>{
        state.loading = true;
    },
    deleteCourseSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    deleteCourseFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    addLectureRequest:(state)=>{
        state.loading = true;
    },
    addLectureSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    addLectureFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    deleteLectureRequest:(state)=>{
        state.loading = true;
    },
    deleteLectureSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    deleteLectureFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    getAllUsersRequest:(state)=>{
        state.loading = true;
    },
    getAllUsersSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    getAllUsersFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    deleteUserRequest:(state)=>{
        state.loading = true;
    },
    deleteUserSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    deleteUserFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    updateUserRoleRequest:(state)=>{
        state.loading = true;
    },
    updateUserRoleSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    updateUserRoleFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    getAdminStatsRequest:(state)=>{
        state.loading = true;
    },
    getAdminStatsSuccess:(state,action)=>{
        state.loading = false;
        state.stats = action.payload.stats;
        state.userCount = action.payload.userCount;
        state.subscriptionCount = action.payload.subscriptionCount;
        state.viewCount = action.payload.viewCount;
        state.userPercentage = action.payload.userPercentage;
        state.viewsPercentage = action.payload.viewsPercentage;
        state.subscriptionPercentage = action.payload.subscriptionPercentage;
        state.userProfit = action.payload.userProfit;
        state.subscriptionProfit = action.payload.subscriptionProfit;
        state.viewsProfit = action.payload.viewsProfit;
    },
    getAdminStatsFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message =null;
    }
})