import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react';
import {FaLinkedinIn,FaGithub,FaInstagram} from 'react-icons/all'

const Footer = () => {
  return (
    <>
    <Box padding={4} bg={'blackAlpha.900'} >
        <Stack direction={['column','row']}>
            <VStack alignItems={['center','flex-start']} w={'full'}>
                <Heading children="All Rights Reserved" color={'white'}/>
                <Heading fontFamily={'body'} size={'sm'} children={'@rahul'} color={'purple.400'}/>
            </VStack>
            <HStack color={'white'} fontSize={40} spacing={['2','10']} justifyContent={'center'}>
              <a href='https://github.com/' target='blank' rel='noreferrer'>
                <FaGithub/>
              </a>
              <a href='https://www.linkedin.com/' target='blank' rel='noreferrer'>
                <FaLinkedinIn/>
              </a>
              <a href='/' target='blank' rel='noreferrer'>
                <FaInstagram/>
              </a>
            </HStack>
        </Stack>
    </Box>
    </>
  )
}

export default Footer
