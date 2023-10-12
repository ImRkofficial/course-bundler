import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
  return (
    <>
        <Container h={'90vh'} paddingY={16}>
            <form>
                <Heading children="Forgot Password" textAlign={['center','left']} my={16} textTransform={'uppercase'}/>
                <VStack spacing={8}>
                <Input
                    required 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='example@mail.com'
                    type='email'
                />
                <Button w={'full'} colorScheme='purple'>Send Reset Link</Button>
                </VStack>
            </form>
        </Container>
    </>
  )
}

export default ForgotPassword;