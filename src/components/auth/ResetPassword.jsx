import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

const ResetPassword = () => {
    const parmas = useParams();
    const [password,setPassword] = useState('');
  return (
    <>
        <Container h={'90vh'} paddingY={16}>
            <form>
                <Heading children="Reset Password" textAlign={['center','left']} my={16} textTransform={'uppercase'}/>
                <VStack spacing={8}>
                <Input
                    required 
                    id='email'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Enter new password...'
                    type='password'
                />
                <Button w={'full'} colorScheme='purple'>Reset Password</Button>
                </VStack>
            </form>
        </Container>
    </>
  )
}

export default ResetPassword;