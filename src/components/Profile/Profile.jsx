import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure, useStatStyles } from '@chakra-ui/react';
import React, { useState } from 'react';
import {MdDeleteForever} from 'react-icons/md';
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

const Profile = ({user}) => {
    
    console.log(user.avatar.url);
 let dummy ='https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';
        

    const removeFormPlayListHandler = (id)=>{
        console.log(id)
    }

    const changeImageSubmitHandler =(e,image)=>{
        e.preventDefault();
        console.log(image)
    };
    const {isOpen,onClose,onOpen} = useDisclosure();
  return (
    <>
    <Container minH={'95vh'} maxW={'container.lg'} py={8}>
    <Heading children={'Profile'} m={8} textTransform={'uppercase'}/>
    <Stack justifyContent={'flex-start'} alignItems={'center'} direction={['column','row']} spacing={[8,16]} p={8}>
        <VStack>
             <Avatar boxSize={'48'}  src={user?.avatar?.url}/>
            <Button colorScheme='purple' variant={'outline'} onClick={onOpen}>
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
                <Text children={user.createdAt?.split('T')[0]}/>
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
        user?.playList?.length > 0 && (
            <Stack alignItems={'center'} direction={['column','row']} flexWrap={'wrap'} p={4}>
                {
                    user?.playList?.map((element)=>(
                        <VStack w={48} m={2} key={element.course}>
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
 
    <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler}/>
    </Container>
    </>
  )
}

export default Profile;






function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){
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
                                <Button w={'full'} type={'submit'} colorScheme='purple'>Change</Button>
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