import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import {RiCheckboxCircleFill} from 'react-icons/ri';
import {Link} from 'react-router-dom'

const PaymentSuccess = () => {

  const params =  new URLSearchParams(window.location.search);
  const [refId,setRefId] = useState("")
  let id = params.get("reference");

  useEffect(()=>{
    setRefId(id)
  },[id])
  return (
    <>
    <Container h={'90VH'} p={16}>
      <Heading my={8} textAlign={'center'} children={'You have Pro Pack'}/>
      <VStack boxShadow={'lg'} pb={16} alignItems={'center'} borderRadius={'lg'}>
      <Box w={'full'} bg={'purple.400'} p={4} css={{borderRadius:'8px 8px 0 0'}}>
        <Text color={'black'} children={'Payment Success'}/>
      </Box>
      <Box p={4}>
        <VStack textAlign={'center'} px={8} mt={4} spacing={8}> 
          <Text children={`Congratulation you're a pro member. You have access to premium content.`} />
          <Heading size={'4xl'}>
            <RiCheckboxCircleFill/>
          </Heading>
        </VStack>
      </Box>
      <Link to={'/profile'}>
        <Button variant={'ghost'}>
          Go to Profile
        </Button>
      </Link>
      <Heading fontSize={'lg'} children={`Reference: ${refId}`}/>
      </VStack>
    </Container>
    </>
  )
}

export default PaymentSuccess