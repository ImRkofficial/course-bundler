import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';


const categories = ['Andriod Development','Web Development','iOS Development','Game Development',"Data Structures & Algorithm","Machine Learning","App Development"];
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

const CreateCourse = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [createdBy,setCreatedBy] = useState('');
  const [category,setCategory] = useState('');
  const [image,setImage] = useState('');
  const [imagePreview,setImagePreview] = useState('');
  const dispatch = useDispatch();

  const {loading,error,message} = useSelector(state => state.admin)

  const changeImageHandler  = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend =()=>{
        setImagePreview(reader.result)
        setImage(file)
    }
}

const submitHandler = (e)=>{
  e.preventDefault();
  const formdata = new FormData();
  formdata.append("title",title)
  formdata.append("description",description)
  formdata.append("createdBy",createdBy)
  formdata.append("category",category)
  formdata.append("file",image)

  dispatch(createCourse(formdata))
  
};

useEffect(()=>{

  if(error){
    toast.error(error)
    dispatch({type:"clearError"})
  }
  if(message){
    toast.success(message)
    dispatch({type:"clearMessage"})
  }

},[dispatch,error,message])

  return (
    <>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Container py={16}>
          <form onSubmit={submitHandler}> 
            <Heading textTransform={'uppercase'} children={'Create Course'} my={16} textAlign={['center', 'left']} />
            <VStack m={'auto'} spacing={8}>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                focusBorderColor='purple.300'
                placeholder='Title'
                type='text'
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                focusBorderColor='purple.300'
                placeholder='Description'
                type='text'
              />
              <Input
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                focusBorderColor='purple.300'
                placeholder='Creator Name'
                type='text'
              />
              <Select focusBorderColor='purple.300' value={category} onChange={(e)=>setCategory(e.target.value)}>

                <option value={''}>Category</option>
                {categories.map((item)=>(
                  <option key={item} value={item}>{item}</option>
                ))}
              </Select>

              <Input
                    required 
                    accept='image/*'
                    focusBorderColor='purple.500'
                    type='file'
                    css={fileUploadStyle}
                    onChange={changeImageHandler}
                />

                {imagePreview && (
                  <Image src={imagePreview} boxSize={64} objectFit={'contain'}/>
                )}

                <Button isLoading={loading} width={'full'} colorScheme='purple' type='submit'>Create Course</Button>
            </VStack>
          </form>
        </Container>
        <SideBar />
      </Grid>
    </>
  )
}

export default CreateCourse;