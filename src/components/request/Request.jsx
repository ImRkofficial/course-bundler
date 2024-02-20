import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';

const Request = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [course,setCourse] = useState('');
    const dispatch = useDispatch();
    const {loading,error,message} = useSelector(state=>state.other);

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(courseRequest(name,email,course));
    };

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message)
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,message])
  return (
    <>
        <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={8} my={10}>
        <Heading children="Request A Course"/>

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
        <FormLabel htmlFor='course' children={"Course"} />
        <Textarea
            required 
            id='course'
            value={course}
            onChange={(e)=>setCourse(e.target.value)}
            focusBorderColor='purple.500'
            placeholder='Explain the course...'
            css={{
                maxHeight:'170px'
            }}
        />
        </Box>
        
        <Box >
            <Button isLoading={loading} colorScheme='purple' type='submit' >Send Request</Button>
        </Box>
        <Box my={4}>
            Checkout available courses?{' '}
            <Link to={'/courses'}>
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

export default Request;