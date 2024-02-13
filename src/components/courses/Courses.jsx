import { Button, Container, HStack, Heading, Image, Input,Stack,Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';

const Course = ({views,title,imageSrc,id,addPlayListHandler,creator,description,lectureCount})=>{
    return(
        <>
        <VStack className='courses' alignItems={['center','flex-start']}>
            <Image
            src={imageSrc}
            boxSize={60}
            objectFit={'contain'}
            />
            <Heading children={title} textAlign={['center','left']} maxW={'200px'} noOfLines={3} size={'sm'} />
            <Text children={description} noOfLines={2}/>
            <HStack>
                <Text textTransform={'uppercase'} fontWeight={'bold'} children={'Created By '}/>
                <Text textTransform={'uppercase'} fontFamily={'body'} children={creator}/>
            </HStack>
            <Heading textTransform={'uppercase'} textAlign={'center'} fontSize={'xs'} children={`Lectures - ${lectureCount}`} />
            <Heading textTransform={'uppercase'} textAlign={'center'} fontSize={'xs'} children={`Views - ${views}`} />

            <Stack flexDirection={['column','row']} alignItems={'center'}>
                <Link to={`/course/${id}`}>
                <Button colorScheme='purple'>
                    Watch Now
                </Button>
                </Link>
                <Button colorScheme='purple' variant={'ghost'} onClick={()=>addPlayListHandler(id)}>
                    Add to PlayList
                </Button>
            </Stack>
        </VStack>
        </>
    )
}

const Courses = () => {
    const [keyword,setKeyword] = useState('');
    const [category,setCategory] = useState('');
    const dispatch = useDispatch();
    const {loading,courses,error} = useSelector(state=>state.course);

    const addtoPlayListHandler  = ()=>{
        console.log('Added to PlayList')
    }

    const categories = ['Andriod Development','Web Development','iOS Development','Game Development',"Data Structures & Algorithm","Machine Learning","App Development"];
  
    useEffect(()=>{
        dispatch(getAllCourses(category,keyword));

        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }
    },[category,keyword,dispatch])

    return (
    <>
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={8}>
        <Heading children="All Courses" m={8}/>
        <Input value={keyword} onChange={(e)=>setKeyword(e.target.value)}
         placeholder='Search a course...' type='text'
         focusBorderColor="purple.400"
         />
         <HStack overflowX={'auto'} paddingY={8} css={{'&::-webkit-scrollbar':{
            display:'none'
         }}}>
            {categories.map((item,index)=>(
                <Button  key={index} onClick={()=>setCategory(item)} minW={60}>
                <Text children={item} />
            </Button>
            ))}
         </HStack>

         <Stack direction={['column','row']}
          justifyContent={['flex-start','space-evenly']} 
          flexWrap={'wrap'}
          alignItems={['center','flex-start']}
          >

        {
            courses.length > 0  ? (courses.map((item)=>(
                <Course

                    key={item?._id}
                    title={item?.title}
                    description={item?.description}
                    id={item?._id}
                    views={item?.views}
                    creator={item?.createdBy}
                    lectureCount={item?.numOfVideos}
                    addPlayListHandler={addtoPlayListHandler}
                    imageSrc={item?.poster?.url}
                />
            ))) : (
                <Heading  mt="4" children="Courses not found"/>
            )
        }
         </Stack>
    </Container>
    </>
  )
}

export default Courses;