import { Box, Grid } from '@chakra-ui/react';
import React from 'react'
import SideBar from '../SideBar';

const AdminCourses = () => {
  return (
    <>
    <Grid minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>
    <Box >

    </Box>
    <SideBar/>
    </Grid>
    </>
  )
}

export default AdminCourses;