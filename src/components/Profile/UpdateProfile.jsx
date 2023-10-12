import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateProfile = () => {
    const [name,setName] = useState('');
    const [email,setEmail]= useState('');
  return (
    <>
    <Container p={16} minH={'90vh'}>
        <form>
            <Heading children={'Update Profile'} my={16} textAlign={['center','left']} textTransform={'uppercase'} />
            <VStack spacing={8} >
            <Input 
                    id='email'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Name'
                    type='text'
                />
            <Input 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Email'
                    type='email'
                />

                <Button colorScheme='purple' w={'full'} type='submit'>Update Profile</Button>
            </VStack>

        </form>
    </Container>
    </>
  )
}

export default UpdateProfile