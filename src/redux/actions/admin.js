import { server } from "../Store";
import axios from "axios";


export const createCourse =  (formData) => async (dispatch)=>{
    try {
        dispatch({type:"allCoursesRequest"})

        const {data} = await axios.post(`${server}/createcourse`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch({type:"allCoursesSuccess",payload:data.message})
    } catch (error) {
        dispatch({
            type:"allCoursesFail",
            payload:error.response.data.message
        })
    }
};