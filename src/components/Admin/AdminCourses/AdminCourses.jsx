import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import {toast} from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from '../CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';

const AdminCourses = () => {
  const { loading, error, message, courses, lectures } = useSelector(
    state => state.course
  );
  const {loading:deleteCourseLoading,error:deleteCourseError,message:deleteCourseMessage}  = useSelector(state=>state.admin)
  const dispatch = useDispatch();
  const [courseId,setCourseId] = useState(null);
  const [courseTitle,setCourseTitle] = useState(null);

  const courseDetailHandler = (courseId,title) => {
    dispatch(getCourseLectures(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
    onOpen();
  };
  const onDeleteHandler = courseId => {
    dispatch(deleteCourse(courseId))
  };

  const deleteLectureButtonHandler =async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId,lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title",title)
    formData.append("description",description)
    formData.append("file",video)

    await dispatch(addLecture(courseId,formData));
    dispatch(getCourseLectures(courseId))
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    dispatch(getAllCourses());

    if(error){
      toast.error(error);
      dispatch({type:"clearError"})
    }

    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }

    if(deleteCourseError){
      toast.error(deleteCourseError)
      dispatch({type:"clearError"})
    }
    if(deleteCourseMessage){
      toast.success(deleteCourseMessage)
      dispatch({type:"clearMessage"})
    }
  }, [dispatch, error, message,deleteCourseMessage,deleteCourseError]);
  return (
    <>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box p={[0, 8]} overflowX={'auto'}>
          <Heading
            children={'All Courses'}
            textAlign={['center', 'left']}
            textTransform={'uppercase'}
            my={16}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available Courses in the database</TableCaption>
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
                {courses?.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    courseDetailHandler={courseDetailHandler}
                    onDeleteHandler={onDeleteHandler}
                    loading={deleteCourseLoading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <CourseModal
            loading={deleteCourseLoading}
            lectures={lectures}
            isOpen={isOpen}
            onClose={onClose}
            deleteButtonHandler={deleteLectureButtonHandler}
            id={courseId}
            CourseTitle={courseTitle}
            addLectureHandler={addLectureHandler}
          />
        </Box>
        <SideBar />
      </Grid>
    </>
  );
};

function Row({ item, courseDetailHandler, onDeleteHandler,loading }) {
  
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            isLoading={loading}
            onClick={() => {
              courseDetailHandler(item._id,item.title)
            }}
          >
            View Lectures
          </Button>
          <Button
            isLoading={loading}
            color={'purple.600'}
            onClick={() => onDeleteHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
