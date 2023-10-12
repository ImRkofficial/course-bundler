import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import introVideo from './../../assets/videos/introVideo.mp4';

const CoursePage = () => {
  const [lectureNumber,setLectureNumber] = useState(0);
  const lectures =[{
    _id:'ewfwff1',
    title:'sample title1',
    description:'Dummy description afsf fdgj',
    video:{
      url:'dummyurl.rf'
    }

  },
  {
    _id:'ewfwff2',
    title:'sample title2',
    description:'Dummy description afsf fdgj',
    video:{
      url:'dummyurl.rf'
    }

  },
  {
    _id:'ewfwff3',
    title:'sample title3',
    description:'Dummy description afsf fdgj',
    video:{
      url:'dummyurl.rf'
    }

  },
  {
    _id:'ewfwff4',
    title:'sample title4',
    description:'Dummy description afsf fdgj',
    video:{
      url:'dummyurl.rf'
    }

  }]
  return (
    <>
    <Grid minH={'50vh'} templateColumns={['1fr','3fr 1fr']}>
      <Box>
      <video width={'100%'} autoPlay={true} controls src={introVideo}
                controlsList='nodownload npremoteplayback'
                disableRemotePlayback
                disablePictureInPicture
                >

                </video>

                <Heading children={`#${lectureNumber+1} ${lectures[lectureNumber].title}`} m={4}/>
                <Heading children="Description" m={4}/>
                <Text m={4} children={lectures[lectureNumber].description}/>
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
    </Grid>
    </>
  )
}

export default CoursePage;