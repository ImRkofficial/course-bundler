import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react';
import {MdErrorOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <>
     <Container h={'90VH'} p={16} alignItems={'center'}>
      <VStack boxShadow={'lg'} pb={16} justifyContent={'center'} alignItems={'center'} spacing={4}>
        <MdErrorOutline size={'5rem'} />
      <Heading my={8} textAlign={'center'} textTransform={'uppercase'} children={`Payment Failed!`}/>
      <Link to={'/subscribe'}>
        <Button variant={'outline'} colorScheme='purple'>Try Again</Button>
      </Link>
      </VStack>
    </Container>
    </>
  )
}

export default PaymentFail;