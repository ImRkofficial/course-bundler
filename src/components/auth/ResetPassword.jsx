import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { resetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const params = useParams();
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const {loading,error,message} = useSelector(state=> state.profile);
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(resetPassword(params.token,password))
    }

    useEffect(()=>{
        if(message){
            toast.success(message)
            dispatch({type:"clearMessage"});
            navigate('/login')
        }
        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
    },[dispatch,error,message])
    
  return (
    <>
        <Container h={'90vh'} paddingY={16}>
            <form onSubmit={submitHandler}>
                <Heading children="Reset Password" textAlign={['center','left']} my={16} textTransform={'uppercase'}/>
                <VStack spacing={8}>
                <Input
                    required 
                    id='email'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Enter new password...'
                    type='password'
                />
                <Button isLoading={loading} type='submit' w={'full'} colorScheme='purple'>Reset Password</Button>
                </VStack>
            </form>
        </Container>
    </>
  )
}

export default ResetPassword;