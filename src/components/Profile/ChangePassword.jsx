import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
  return (
    <>
    <Container p={16} minH={'90vh'}>
        <form>
            <Heading children={'Change Password'} my={16} textAlign={['center','left']} textTransform={'uppercase'} />
            <VStack spacing={8} >
            <Input
                    required 
                    id='email'
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Old password...'
                    type='password'
                />
            <Input
                    required 
                    id='email'
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='New password..'
                    type='password'
                />

                <Button colorScheme='purple' w={'full'} type='submit'>Change Password</Button>
            </VStack>

        </form>
    </Container>
    </>
  )
}

export default ChangePassword