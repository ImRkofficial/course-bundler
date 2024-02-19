import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, message  } = useSelector(state => state.admin);

  const onChangeHandler = userId => {
    dispatch(updateUserRole(userId))
  };
  const onDeleteHandler = userId => {
    dispatch(deleteUser(userId))
  };

  useEffect(() => {
    dispatch(getAllUsers());
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
  }, [dispatch,error,message]);
  return (
    <>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={[0, 16]} overflowX={'auto'}>
              <Heading
                children={'All Users'}
                textAlign={['center', 'left']}
                textTransform={'uppercase'}
                my={16}
              />
              <TableContainer w={['100vw', 'full']}>
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
                    {users && users?.map(item => (
                      <Row
                        key={item._id}
                        item={item}
                        onChangeHandler={onChangeHandler}
                        onDeleteHandler={onDeleteHandler}
                        loading={loading}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
        <SideBar />
      </Grid>
    </>
  );
};

export default Users;

function Row({ item, onChangeHandler, onDeleteHandler ,loading}) {
  return (
    <Tr>
      <Td>#{item?._id}</Td>
      <Td>{item?.name}</Td>
      <Td>{item?.email}</Td>
      <Td>{item?.role}</Td>
      <Td>{item?.subscription?.status === 'created' ? 'Active' : 'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={e => onChangeHandler(item?._id)}
            isLoading={loading}
          >
            Change Role
          </Button>
          <Button isLoading={loading} color={'purple.600'} onClick={e => onDeleteHandler(item?._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
