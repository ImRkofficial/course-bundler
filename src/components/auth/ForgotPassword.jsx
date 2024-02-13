import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();
    const {loading,message,error} = useSelector(state => state.profile);

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(forgetPassword(email))
    }

    useEffect(()=>{
        if(message){
            toast.success(message)
            dispatch({type:"clearMessage"})
        }
        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
    },[dispatch,error,message])
  return (
    <>
        <Container h={'90vh'} paddingY={16}>
            <form onSubmit={handleSubmit}>
                <Heading children="Forgot Password" textAlign={['center','left']} my={16} textTransform={'uppercase'}/>
                <VStack spacing={8}>
                <Input
                    required 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='example@mail.com'
                    type='email'
                />
                <Button isLoading={loading} type='submit' w={'full'} colorScheme='purple'>Send Reset Link</Button>
                </VStack>
            </form>
        </Container>
    </>
  )
}

export default ForgotPassword;