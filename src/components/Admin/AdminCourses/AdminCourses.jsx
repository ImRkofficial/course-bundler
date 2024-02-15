import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from '../CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../../redux/actions/course';

const AdminCourses = () => {
  const {loading,error,message,courses} = useSelector(state=>state.course);
  const dispatch = useDispatch();


const courseDetailHandler = (userId)=>{
  console.log(userId)
  onOpen();
}
const onDeleteHandler = (userId)=>{
  console.log(userId)
}

const deleteLectureButtonHandler =(courseId,lectureId)=>{
  console.log(`${courseId} and the lecture id is ${lectureId}`)
}

const addLectureHandler=(e,courseId,title,description,video)=>{
  e.preventDefault();
}

  const {isOpen,onClose,onOpen} = useDisclosure();

  useEffect(()=>{
    dispatch(getAllCourses());

  },[dispatch,courses,error,message])
  return (
    <>
    <Grid minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>
    <Box p={[0,8]} overflowX={'auto'}>
      <Heading children={'All Courses'} textAlign={['center','left']} textTransform={'uppercase'} my={16} />
      <TableContainer w={['100vw','full']}>
      <Table variant={'simple'} size={'lg'}>
        <TableCaption>
          All available Courses in the database
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Poster</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Creator</Th>
            <Th isNumeric>Views</Th>
            <Th isNumeric>Lectures</Th> 
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
        {courses.map((item)=>(
          <Row key={item._id} item={item}  courseDetailHandler={courseDetailHandler} onDeleteHandler={onDeleteHandler}/>
        ))}
        </Tbody>
      </Table>
      </TableContainer>
      <CourseModal isOpen={isOpen} onClose={onClose}  deleteButtonHandler={deleteLectureButtonHandler} id={'werwer03802380'} CourseTitle={'React Development'} addLectureHandler={addLectureHandler}/> 
    </Box>
    <SideBar/>
    </Grid>
    </>
  )
}



function Row({item,courseDetailHandler,onDeleteHandler}){

  
  return(
      <Tr>
        <Td>#{item._id}</Td>
        <Td>
          <Image src={item.poster.url}/>
        </Td>
        <Td>{item.title}</Td>
        <Td textTransform={'uppercase'}>{item.category}</Td>
        <Td>{item.createdBy}</Td>
        <Td isNumeric>{item.views}</Td>
        <Td isNumeric>{item.numOfVideos}</Td>
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button variant={'outline'} color={'purple.500'} onClick={()=>courseDetailHandler(item._id)}>View Lectures</Button>
            <Button color={'purple.600'} onClick={()=>onDeleteHandler(item._id)}>
              <RiDeleteBin7Fill/>
            </Button>
          </HStack>
        </Td>
      </Tr>
  )
}

export default AdminCourses;