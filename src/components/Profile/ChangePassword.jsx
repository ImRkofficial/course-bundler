import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(changePassword(oldPassword,newPassword));
    }

    const {loading,error,message}  = useSelector(state=> state.profile)

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }
        if(message){
            console.log("The message is",message);
            toast.success(message)
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,message])
  return (
    <>
    <Container p={16} minH={'90vh'}>
        <form onSubmit={submitHandler}>
            <Heading children={'Change Password'} my={16} textAlign={['center','left']} textTransform={'uppercase'} />
            <VStack spacing={8} >
            <Input
                    required 
                    id='oldPass'
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='Old password...'
                    type='password'
                />
            <Input
                    required 
                    id='newPass'
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    focusBorderColor='purple.500'
                    placeholder='New password..'
                    type='password'
                />

                <Button isLoading={loading} colorScheme='purple' w={'full'} type='submit'>Change Password</Button>
            </VStack>

        </form>
    </Container>
    </>
  )
}

export default ChangePassword