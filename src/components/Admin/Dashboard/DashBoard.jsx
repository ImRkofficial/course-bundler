import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SideBar from '../SideBar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../Loader/Loader';

const DataBox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      w={['full', '20%']}
      boxShadow={`-2px 0px 10px rgba(107,70,193,0.5)`}
      p={8}
      borderRadius={'lg'}
    >
      <Text children={title} />
      <HStack spacing={6}>
        <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
        <HStack>
          <Text children={`${qtyPercentage}%`} />
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text children={'Since Last Month'} opacity={0.5} />
    </Box>
  );
};

const Bar = ({ title, value, profit }) => (
  <Box py={4} px={[0, 20]}>
    <Heading size={'sm'} children={title} mb={2} />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? `0%` : `-${value}%`} />
      <Progress
        value={`${profit ? value : 0}`}
        w={'full'}
        colorScheme="purple"
      />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const DashBoard = () => {
  const dispatch = useDispatch();
  const {loading,
    userCount,
    subscriptionCount,
    viewCount,
    userPercentage,
    viewsPercentage,
    subscriptionPercentage,
    userProfit,
    subscriptionProfit,
    viewsProfit,
    stats
} = useSelector(state=>state.admin)

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);
  return (
    <>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        {loading || !stats ? (
          <Loader />
        ) : (
          <>
            <Box boxSizing="border-box" py={16} px={[4, 0]}>
              <Text
                textAlign={'center'}
                opacity={0.7}
                children={`Last Change was on ${
                  String(new Date(stats && stats[11]?.createdAt)).split('G')[0]
                }`}
              />
              <Heading
                children={'Dashboard'}
                ml={[0, 16]}
                textAlign={['center', 'left']}
                mb={16}
              />
              <Stack
                direction={['column', 'row']}
                minH={24}
                justify={'space-evenly'}
              >
                <DataBox
                  title="Views"
                  qty={viewCount}
                  qtyPercentage={viewsPercentage}
                  profit={viewsProfit}
                />
                <DataBox
                  title="Users"
                  qty={userCount}
                  qtyPercentage={userPercentage}
                  profit={userProfit}
                />
                <DataBox
                  title="Subscription"
                  qty={subscriptionCount}
                  qtyPercentage={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Stack>

              <Box
                m={[0, 16]}
                borderRadius={'lg'}
                padding={[0, 16]}
                mt={[4, 16]}
                boxShadow={`-2px 0px 10px rgba(107,70,193,0.5)`}
              >
                <Heading
                  textAlign={['center', 'left']}
                  size={'md'}
                  children={'Views Graph'}
                  pt={[8, 0]}
                  ml={[0, 16]}
                />
                {/* Line Graph Here */}
                <LineChart views={stats?.map((items)=>items.views)} />
              </Box>

              <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p={4}>
                  <Heading
                    textAlign={['center', 'left']}
                    size={'md'}
                    my={8}
                    ml={[0, 16]}
                    children={'Progress Bar'}
                  />
                  <Box>
                    <Bar profit={viewsProfit} title={'Views'} value={viewsPercentage} />
                    <Bar profit={userProfit} title={'Users'} value={userPercentage} />
                    <Bar profit={subscriptionProfit} title={'Subscription'} value={subscriptionPercentage} />
                  </Box>
                </Box>

                <Box p={[0, 16]} boxSize={'border-box'} py={4}>
                  <Heading
                    textAlign={'center'}
                    size={'md'}
                    children={'Users'}
                    mb={4}
                  />
                  {/* Doughnut Chart */}
                  <DoughnutChart users={[subscriptionCount,userCount - subscriptionCount]} />
                </Box>
              </Grid>
            </Box>
          </>
        )}
        <SideBar />
      </Grid>
    </>
  );
};

export default DashBoard;
