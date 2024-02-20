import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../../redux/actions/other';
import {toast} from 'react-hot-toast';

const Contact = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const dispatch = useDispatch();
    const {message:courseMessage,error,loading} = useSelector(state=>state.other);

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(contactUs(name,email,message))
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }
        if(courseMessage){
            toast.success(courseMessage)
            dispatch({type:"clearMessage"})
        }
    },[dispatch,courseMessage,error])
  return (
    <>
        <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={8} my={10}>
        <Heading children="Contact Us"/>

<form style={{width:'100%'}} onSubmit={submitHandler}>
        <Box my={4}>
        <FormLabel htmlFor='name' children={"Name"} />
        <Input
            required 
            id='name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            focusBorderColor='purple.500'
            placeholder='Name'
            type='text'
        />
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='email' children={"Email"} />
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
        <FormLabel htmlFor='message' children={"Message"} />
        <Textarea
            required 
            id='message'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            focusBorderColor='purple.500'
            placeholder='Type your message here...'
            css={{
                maxHeight:'170px'
            }}
        />
        </Box>
        
        <Box >
            <Button isLoading={loading} colorScheme='purple' type='submit' >Send Email</Button>
        </Box>
        <Box my={4}>
            Request a course?{' '}
            <Link to={'/request'}>
            <Button colorScheme='purple' type='submit' variant={'link'} >Click</Button>
            </Link>
           {' '} here
        </Box>
    </form>
        </VStack>
        </Container>
    </>
  )
}

export default Contact;