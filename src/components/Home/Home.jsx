import React from 'react';
import {Heading, Stack,VStack,Text, Button,Image, Box,HStack} from '@chakra-ui/react';
import './home.css'
import { Link } from 'react-router-dom';
import BG from '../../../src/assets/images/bg.png';
import {CgGoogle,CgYoutube} from 'react-icons/cg';
import {SiCoursera,SiUdemy} from 'react-icons/si';
import {DiAws} from 'react-icons/di';
import introVideo from './../../assets/videos/introVideo.mp4';


const Home = () => {
  return (
    <>
        <section className="home">
            <div className="container">
                <Stack
                    direction={['column','row']}
                    height="100%"
                    justifyContent={['center','space-between']}
                    alignItems="center"
                    spacing={['16','56']}

                >
                <VStack width={'full'} alignItems={['center','flex-end']} spacing={'6'}>
                    <Heading 
                   
                    children="LEARN FROM THE EXPERTS" size={'2xl'}/>
                    <Text
                    textAlign={['center','left']}
                    children="Find valuable content at reasonable price"/>
                    <Link to={'/courses'}>
                        <Button size={'lg'} colorScheme='purple'>
                            Explore Now
                        </Button>
                    </Link>
                </VStack>

                <Image className='vector-graphics' boxSize={'md'} src={BG} objectFit={'contain'}/>

                </Stack>
            </div>

            <Box padding={'8'} bg={'blackAlpha.800'}>
                <Heading children="OUR BRANDS"
                    textAlign={'center'}
                    fontFamily={'body'}
                    color={'purple.400'}
                />
                <HStack className='brands-banner' justifyContent={'space-evenly'} marginTop={4}>
                    <CgGoogle/>
                    <CgYoutube/>
                    <SiCoursera/>
                    <SiUdemy/>
                    <DiAws/>
                </HStack>
            </Box>
            <div className="container-2">
                <video autoPlay={true} controls src={introVideo}
                controlsList='nodownload nofullscreen npremoteplayback'
                disableRemotePlayback
                disablePictureInPicture
                >

                </video>
            </div>
        </section>
    </>
  )
}

export default Home