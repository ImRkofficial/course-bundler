import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export const fileUploadStyle ={
    "&::file-selector-button":{
        cursor:"pointer",
        marginLeft:"-5%",
        width:"110%",
        color:"black",
        border:"none",
        backgroundColor:"#BEADFA",
        height:'100%'
    }
}


const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [imagePreview,setImagePreview] = useState('');

    const changeImageHandler  = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend =()=>{
            setImagePreview(reader.result)
            setImage(file)
        }
    }

  return (
    <>
    <Container h={'full'} py={30} my={10}>
        <VStack h={'full'} justifyContent={'center'} spacing={16}>
            <Heading textTransform={"uppercase"} children={"Register"} />
            <form style={{width:'100%'}}>
                <Box m={4} display={'flex'} justifyContent={'center'}>
                    <Avatar src={imagePreview} size={'2xl'} />
                </Box>
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
                <FormLabel htmlFor='email' children={"Email Address"} />
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
                <FormLabel htmlFor='password' children={"Password"} />
                <Input
                    required 
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='********'
                    type='password'
                />
                </Box>
                <Box my={4}>
                <FormLabel htmlFor='chooseAvatar' children={"Choose Avatar"} />
                <Input
                    required 
                    id='chooseAvatar'
                    accept='image/*'
                    focusBorderColor='purple.500'
                    type='file'
                    css={fileUploadStyle}
                    onChange={changeImageHandler}
                />
                </Box>
                <Box >
                    <Button colorScheme='purple' type='submit' >Sign Up</Button>
                </Box>
                <Box my={4}>
                Already User?{' '}
                    <Link to={'/login'}>
                       <Button fontSize={'sm'} my={4} variant={'link'} colorScheme='purple'>
                       Login
                       </Button>{' '}here
                    </Link>
                </Box>
            </form>
        </VStack>
    </Container>
    </>
  )
}

export default Register;