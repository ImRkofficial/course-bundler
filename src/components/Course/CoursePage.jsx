import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import introVideo from './../../assets/videos/introVideo.mp4';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate, useParams} from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Loader/Loader';

const CoursePage = ({user}) => {
  let {user:mainUser} = user;
  console.log(mainUser);

  const [lectureNumber,setLectureNumber] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const {lectures,loading} = useSelector(state=>state.course);
 

  useEffect(()=>{
    dispatch(getCourseLectures(params.id))
  },[dispatch,params.id,mainUser]);

  if(mainUser?.role !== 'admin' && (mainUser?.subscription === undefined || mainUser?.subscription?.status !== "created" )){
    return <Navigate to={'/subscribe'}/>

  }
  return (
    <>
    {loading ? <Loader/> : (
    <Grid minH={'50vh'} templateColumns={['1fr','3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
      <video width={'100%'} autoPlay={true} controls src={lectures[lectureNumber]?.video?.url}
                controlsList='nodownload npremoteplayback'
                disableRemotePlayback
                disablePictureInPicture
                >

                </video>

                <Heading children={`#${lectureNumber+1} ${lectures[lectureNumber]?.title}`} m={4}/>
                <Heading children="Description" m={4}/>
                <Text m={4} children={lectures[lectureNumber]?.description}/>
      </Box>
      <VStack>
        {lectures.map((item,index)=>(
          <button key={item._id}
          onClick={()=>setLectureNumber(index)}
          style={{
            width:'100%',
            padding:'1rem',
            textAlign:'center',
            margin:0,
            borderBottom:'1px solid rgba(0,0,0,0.2)'
          }}
          >

            <Text>
              #{index+1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
        </>
      ):(
        <>
          <Heading children="No Lectures"/>
        </>
      )}
    </Grid>
     )}
    </>
  )
}

export default CoursePage;