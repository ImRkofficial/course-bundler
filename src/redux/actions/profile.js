import { server } from '../Store';
import axios from 'axios';

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const data = await axios.put(`${server}/updateprofile`,{name,email},{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })

    dispatch({ type: 'updateProfileSuccess', payload:data.data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data.message,
    });
  }
};



export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: 'updatePasswordRequest' });
  
      const data = await axios.put(`${server}/changepassword`,{oldPassword,newPassword},{
          headers:{
              "Content-Type":"application/json"
          },
          withCredentials:true
      });
      

      dispatch({ type: 'updatePasswordSuccess', payload:data.data.message });
    } catch (error) {
      dispatch({
        type: 'updatePasswordFail',
        payload: error.response.data.message,
      });
    }
  };


  export const updateProfilePicture = (formdata) => async (dispatch) => {
    try {
      dispatch({ type: 'updateProfilePictureRequest' });
  
      const data = await axios.put(`${server}/updateprofilepicture`,formdata,{
          headers:{
              "Content-Type":"multipart/form-data"
          },
          withCredentials:true
      }) 
  
      dispatch({ type: 'updateProfilePictureSuccess', payload:data.data.message });
    } catch (error) {
      dispatch({
        type: 'updateProfilePictureSuccess',
        payload: error.response.data.message,
      });
    }
  };