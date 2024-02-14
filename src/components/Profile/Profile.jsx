import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure, useStatStyles } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {MdDeleteForever} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromPlayList, updateProfilePicture } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';

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

const Profile = ({user}) => {
   
    const dispatch = useDispatch();
    const {loading,message,error} = useSelector(state=>state.profile);
    console.log(loading,message,error);
    const removeFormPlayListHandler = async (id)=>{
       await dispatch(removeFromPlayList(id));
        dispatch(loadUser())
    }

    const changeImageSubmitHandler = async (e,image)=>{
        e.preventDefault();
        const formData = new FormData();

        formData.append("file",image);
         dispatch(updateProfilePicture(formData));
       dispatch(loadUser())

    };
    useEffect(()=>{
        if(error){
            toast.error(error)
                dispatch({type:"clearError"})  
        }
        if(message){
            toast.success(message)
                setTimeout(() => {
                    dispatch({type:"clearMessage"})
                }, 2000);
        }
    },[dispatch,error,message])
    const {isOpen,onClose,onOpen} = useDisclosure();
  return (
    <>
    <Container minH={'95vh'} maxW={'container.lg'} py={8}>
    <Heading children={'Profile'} m={8} textTransform={'uppercase'}/>
    <Stack justifyContent={'flex-start'} alignItems={'center'} direction={['column','row']} spacing={[8,16]} p={8}>
        <VStack>
             <Avatar boxSize={'48'}  src={user?.avatar?.url}/>
            <Button  colorScheme='purple' variant={'outline'} onClick={onOpen}>
                Change Photo
            </Button>
        </VStack>
        <VStack spacing={4} alignItems={['center','flex-start']}>
            <HStack>
                <Text children={'Name:'} fontWeight={'bold'}/>
                <Text children={user?.name}/>
            </HStack>
            <HStack>
                <Text children={'Email:'} fontWeight={'bold'}/>
                <Text children={user?.email}/>
            </HStack>
            <HStack>
                <Text children={'Created At:'} fontWeight={'bold'}/>
                <Text children={user?.createdAt?.split('T')[0]}/>
            </HStack>
            {
                user?.role !== 'admin' && (
                    <HStack>
                <Text children={'Subscription'} fontWeight={'bold'}/>
                {user?.subscription?.status === 'active' ? (
                    <Button color={'purple.500'} variant={'unstyled'}>Cancel Subscription</Button>
                ):(
                    <Link to={'/subscribe'}>
                        <Button colorScheme='purple' variant={'solid'}>
                          Subscribe Now
                        </Button>
                    </Link>
                )}
            </HStack>
                )}

            <Stack alignItems={'center'} direction={['column','row']}>
                <Link to='/updateprofile'>
                    <Button>Update Profile</Button>
                </Link>
                <Link to='/changepassword'>
                    <Button>Change Password</Button>
                </Link>
                </Stack>    
        </VStack>
    </Stack>

    <Heading children={'Playlist'} size={'md'} my={8} />
    {
        user?.playlist?.length > 0 && (
            <Stack alignItems={'center'} direction={['column','row']} flexWrap={'wrap'} p={4}>
                {
                    user?.playlist?.map((element,i)=>(
                        <VStack w={48} m={2} key={i}>
                            <Image boxSize={'full'} objectFit={'contain'} src={element.poster}/>
                            <HStack>
                                <Link to={`/course/${element.course}`}>
                                <Button variant={'outline'} colorScheme='purple'>Watch Now</Button>
                                </Link>
                                <Button onClick={()=>removeFormPlayListHandler(element.course)}>
                                    <MdDeleteForever size={'1.5rem'}/>
                                </Button>
                            </HStack>
                        </VStack>
                    ))
                }
            </Stack>
        )
    }
 
    <ChangePhotoBox loading={loading} isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler}/>
    </Container>
    </>
  )
}

export default Profile;






function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler,loading}){
    const [image,setImage] = useState('');
    const [imagePreview,setImagePreview] = useState('');

    const changeImage  = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        
        reader.onloadend =()=>{
            setImagePreview(reader.result)
            setImage(file)
        }
    }

    const closeHandler =()=>{
        onClose();
        setImagePreview('');
        setImage('')

    }
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter={'blur(10px'}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalBody>
                    <Container>
                        <form action="" onSubmit={(e)=>changeImageSubmitHandler(e,image)}>
                            <VStack spacing={8}>
                                <Avatar boxSize={48} src={imagePreview} />
                                <Input accept='image/*' focusBorderColor='purple.500' type='file' css={fileUploadStyle} onChange={changeImage}/>
                                <Button isLoading={loading} w={'full'} type={'submit'} colorScheme='purple'>Change</Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={closeHandler}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}