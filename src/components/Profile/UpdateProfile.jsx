import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile} from './../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {
    
    const [name,setName] = useState(user.user.name);
    const [email,setEmail]= useState(user.user.email);
    const dispatch = useDispatch();
    const {loading,message,error} = useSelector(state=>state.profile);
    const navigate = useNavigate();

    const submitHandler =async (e)=>{
        e.preventDefault();
      await  dispatch(updateProfile(name,email));
      dispatch(loadUser())
      navigate("/profile")
    };

    useEffect(()=>{
        if(message){
            toast.success(message)
            setTimeout(() => {
                dispatch({type:"clearMessage"})
            }, 3000);
        }
        if(error){
            toast.error(error)
            setTimeout(() => {
                dispatch({type:"clearError"})
            }, 3000);
        }
    },[dispatch,error,message])
  return (
    <>
    <Container p={16} minH={'90vh'}>
        <form onSubmit={submitHandler}>
            <Heading children={'Update Profile'} my={16} textAlign={['center','left']} textTransform={'uppercase'} />
            <VStack spacing={8} >
            <Input 
                    id='email'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Name'
                    type='text'
                />
            <Input 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Email'
                    type='email'
                />

                <Button isLoading={loading} colorScheme='purple' w={'full'} type='submit'>Update Profile</Button>
            </VStack>

        </form>
    </Container>
    </>
  )
}

export default UpdateProfile