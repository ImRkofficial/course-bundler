import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';


export const fileUploadStyle ={
    "&::file-selector-button":{
        cursor:"pointer",
        marginLeft:"-5%",
        width:"110%",
        color:"purple",
        border:"none",
        backgroundColor:"#FeFFFF",
        height:'100%'
    }
  }

const CourseModal = ({ isOpen, onClose, id, deleteButtonHandler, CourseTitle, lectures = [],loading, addLectureHandler }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');
    const [videoPreview, setVideoPreview] = useState('');


    const changeVideoHandler  = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
    
        reader.onloadend =()=>{
            setVideoPreview(reader.result)
            setVideo(file)
        }
    }

    const handleClose = ()=>{
        setTitle('')
        setDescription('')
        setVideoPreview('')
        setVideo('')
        onClose()

    }


    return (
        <>
            <Modal isOpen={isOpen} size={'full'} onClose={handleClose} scrollBehavior='outside'>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        {CourseTitle}
                    </ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody p={16}>
                        <Grid templateColumns={['1fr', '3fr 1fr']}>
                            <Box px={[0, 16]}>
                                <Box my={'5'}>
                                    <Heading children={CourseTitle} />
                                    <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
                                </Box>
                                <Heading children={'Lectures'} size={'lg'} />
                               {lectures?.length > 0 && lectures?.map((item,index)=>(
                                 <VideoCard
                                 key={index}
                                 title={item.title}
                                 num={index + 1}
                                 lectureId={item._id}
                                 courseId={id}
                                 deleteButtonHandler={deleteButtonHandler}
                                 description={item.description}
                                 loading={loading}
                             />
                               ))}
                            </Box>

                            <Box>
                                <form onSubmit={(e) => addLectureHandler(e, id, title, description, video)}>
                                    <VStack spacing={4}>
                                        <Heading children={'Add Lecture'} size={'md'} textTransform={'uppercase'} />
                                        <Input focusBorderColor='purple.300' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                        <Input focusBorderColor='purple.300' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                        <Input
                                            required
                                            accept='video/mp4'
                                            focusBorderColor='purple.300'
                                            type='file'
                                            css={fileUploadStyle}
                                            onChange={changeVideoHandler}
                                        />
                                        {
                                            videoPreview && (
                                                <video controlsList='nodownload' controls src={videoPreview}></video>
                                            )
                                        }
                                        <Button w={'full'} colorScheme='purple' type='submit' isLoading={loading}>
                                            Upload
                                        </Button>
                                    </VStack>
                                </form>
                            </Box>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CourseModal;

function VideoCard({ title,loading, num, lectureId, courseId, deleteButtonHandler, description }) {
    return (
        <Stack direction={['column', 'row']} my={8} borderRadius={'lg'} boxShadow={'0 0 10px rgba(107,70,193,0.5)'} justifyContent={['flex-start', 'space-between']} p={[4, 8]}>
            <Box>
                <Heading size={'sm'} children={`${num} ${title}`} />
                <Text children={description} />
            </Box>
            <Button isLoading={loading} color={'purple.600'} onClick={() => deleteButtonHandler(courseId, lectureId)}>
                <RiDeleteBin7Fill />
            </Button>

        </Stack>
    )
}