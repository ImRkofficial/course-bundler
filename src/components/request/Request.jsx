import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Request = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [course,setCourse] = useState('');
  return (
    <>
        <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={8} my={10}>
        <Heading children="Request A Course"/>

<form style={{width:'100%'}}>
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
            <Button colorScheme='purple' type='submit' >Send Request</Button>
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