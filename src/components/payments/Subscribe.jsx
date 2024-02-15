import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/Store';
import { buySubscription } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import logo from './../../assets/images/logo.svg';

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key,setKey] = useState("");
  const {loading,subscriptionId,error}  = useSelector(state=>state.subscription);
  const {error:courseError} = useSelector(state=>state.course);

  const subscribeHandler = async ()=>{
   const {data} =  await axios.get(`${server}/razorpaykey`);
   setKey(data.key)

   dispatch(buySubscription());

  };
   useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(courseError){
      toast.error(courseError)
      dispatch({type:"clearError"})
    }
    if(subscriptionId){
      const openPopup = ()=>{
        const options = {
            key: key, 
            name: "Course-bundler Corp Limited",
            description: "Get access to all premium content",
            image: logo,
            subscription_id: subscriptionId,
            callback_url:`${server}/paymentverification`,
            prefill: { 
                name: user.name,
                email: user.email,
                contact: "" 
            },
            notes: {
                address: "Coursebundler Private Limited Jaipur,302012"
            },
            theme: {
                "color": "#832aff"
            }
        }

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();   
    }
   },[dispatch,key,error,user.name,user.email,subscriptionId,courseError])
  

  return (
    <>
    <Container h={'90vh'} p={16}> 
    <Heading children={'Welcome'} my={8} text-textAlign={'center'}/>
    <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={0}>
      <Box bg={'purple.400'} p={4}  css={{ borderRadius:'8px 8px 0 0' }} >
        <Text color={'black'} children={'Pro Pack - ₹299.00'}/>
      </Box>

      <Box p={4}>
        <VStack textAlign={'center'} px={8} mt={4} spacing={8}>
          <Text  children={'Join pro pack and get access to all content'}/>
          <Heading size={'md'} children={'₹299 Only'} />
        </VStack>

        <Button isLoading={loading} my={8} w={'full'} colorScheme='purple' onClick={subscribeHandler}>
          Buy Now
        </Button>
      </Box>

      <Box bg={'blackAlpha.600'} p={4} css={{borderRadius:'0 0 8px 8px'}}>

        <Heading size={'sm'} children={'100% Refund at cancellation'} color={'white'} textTransform={'uppercase'}/>
        <Text fontSize={'xs'} color={'white'} children={'Terms & Conditions apply'} />
      </Box>

    </VStack>
        
    </Container>
    </>
  )
}

export default Subscribe;