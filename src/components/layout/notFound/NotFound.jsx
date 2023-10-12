import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react';
import {RiErrorWarningFill} from 'react-icons/all'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
     <Container h={'90VH'} p={16} alignItems={'center'}>
      <VStack boxShadow={'lg'} pb={16} justifyContent={'center'} alignItems={'center'} spacing={4}>
        <RiErrorWarningFill size={'5rem'} />
      <Heading my={8} textAlign={'center'} textTransform={'uppercase'} children={`Page Not Found`}/>
      <Heading my={4} textAlign={'center'} textTransform={'uppercase'} children={`Error 404`}/>
      <Link to={'/'}>
        <Button variant={'outline'} colorScheme='purple'>Go Back to Home Page</Button>
      </Link>
      </VStack>
    </Container>
    </>
  )
}

export default NotFound