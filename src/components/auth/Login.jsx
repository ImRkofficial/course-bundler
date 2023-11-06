import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(login(email,password));

        
    }
  return (
    <>
    <Container h={'95vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={16}>
            <Heading children={"Welcomr to CourseBundler"} />
            <form onSubmit={submitHandler} style={{width:'100%'}}>
                <Box my={4}>
                <FormLabel htmlFor='email' children={"Email Address"} />
                <Input
                    required 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='example@mail.com'
                    type='email'
                />
                </Box>
                <Box my={4}>
                <FormLabel htmlFor='password' children={"Password"} />
                <Input
                    required 
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='********'
                    type='password'
                />
                </Box>
                <Box>
                    <Link to={'/forgetpassword'} >
                       <Button fontSize={'sm'} my={4} variant={'link'} colorScheme='purple'>
                       Forgot Password?
                       </Button>
                    </Link>
                </Box>
                <Box >
                    <Button colorScheme='purple' type='submit' >Login</Button>
                </Box>
                <Box my={4}>
                New User?{' '}
                    <Link to={'/register'}>
                       <Button fontSize={'sm'} my={4} variant={'link'} colorScheme='purple'>
                       Sign Up
                       </Button>{' '}here
                    </Link>
                </Box>
            </form>
        </VStack>
    </Container>
    </>
  )
}

export default Login