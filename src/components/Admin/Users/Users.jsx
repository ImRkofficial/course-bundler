import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'


const users =[{
      _id:'325523sfgert5454564',
      name:'John Doe',
      email:'john@mail.co.in',
      role:'admin',
      subscription:{
        status:'active'
      }

}];

const onChangeHandler = (userId)=>{
  console.log(userId)
}
const onDeleteHandler = (userId)=>{
  console.log(userId)
}
const Users = () => {
  return (
    <>
    <Grid minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>
    <Box p={[0,16]} overflowX={'auto'}>
      <Heading children={'All Users'} textAlign={['center','left']} textTransform={'uppercase'} my={16} />
      <TableContainer w={['100vw','full']}>
      <Table variant={'simple'} size={'lg'}>
        <TableCaption>
          All available users in the database
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Subscription</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
        {users.map((item)=>(
          <Row key={item._id} item={item} onChangeHandler={onChangeHandler}/>
        ))}
        </Tbody>
      </Table>
      </TableContainer>
    </Box>
    <SideBar/>
    </Grid>
    </>
  )
}

export default Users

function Row({item}){

  
  return(
      <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.role}</Td>
        <Td>{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button variant={'outline'} color={'purple.500'} onClick={(e)=>onChangeHandler(item._id)}>Change Role</Button>
            <Button color={'purple.600'} onClick={(e)=>onDeleteHandler(item._id)}>
              <RiDeleteBin7Fill/>
            </Button>
          </HStack>
        </Td>
      </Tr>
  )
}