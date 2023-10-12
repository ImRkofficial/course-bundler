import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from './../../assets/videos/introVideo.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import Data from './../../assets/docs/termsAndConditions';

const Founder = ()=>(
    <Stack direction={['column','row']} spacing={[4,16]} padding={8}>
        <VStack>
            <Avatar boxSize={[40,48]}/>
            <Text opacity={'0.7'} children={'Co-Founder'}/>
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
            <Heading bgGradient='linear(to-l, #B931FC, #9400FF)'  bgClip='text'  fontSize='6xl'  fontWeight='extrabold' children={'Rahul Sharma'} size={['md','xl']}/>
            <Text textAlign={['center','left']} children={`Hi, I'am a Full-Stack Developer. Introducing CourseBundler, your trusted destination for top-quality, education-based online courses. We're here to empower lifelong learners, students, and professionals with a diverse range of knowledge and skill-building opportunities. Our platform offers a curated selection of engaging, expertly crafted courses across various subjects and disciplines. Whether you're looking to expand your horizons, enhance your career prospects, or simply explore a new passion, we've got you covered. With a commitment to excellence, accessibility, and convenience, CourseBundler is your partner in the pursuit of knowledge and personal growth. Discover the world of online learning with us and unlock your full potential today.`}/>
        </VStack>
    </Stack>
);

const VideoPlayer= ()=>(
    <Box>
        <video autoPlay={true} muted loop controls src={introVideo}
                controlsList='nodownload nofullscreen npremoteplayback'
                disableRemotePlayback
                disablePictureInPicture
                style={{margin:'auto'}}
                >

                </video>
    </Box>
);


const TandC =()=>(
    <Box my={16}>
        <Heading size={'md'} children={'Terms & Conditions'} textAlign={['center','left']}/>
        <Box h={'sm'} p={4} overflowY={'scroll'}>
            <Text textAlign={['center','left']} fontFamily={'heading'} letterSpacing={'widest'}>{<Data/>}</Text>
            <Heading my={4}  size={'xs'} children={'Refund only applicable for cancellation within 7 days.'} />
        </Box>
    </Box>
);


const About = () => {
  return (
    <>
        <Container maxW={'container.lg'} padding={16} boxShadow={'lg'}>
            <Heading textAlign={['center','left']} children={"About Us"}/>
            <Founder/>
            <Stack m={8} alignItems={'center'} direction={['column','row']}>
                <Text fontFamily={'cursive'} m={8} textAlign={['center','left']} children={`That's a video streaming platform with some premium courses that's available only for premium users. `} />

            <Link to={'/subscribe'}>
                <Button variant={'outline'} colorScheme='purple' >
                    Checkout Our Plan
                </Button>
            </Link>

            </Stack>
            <VideoPlayer/>
            <TandC/>
            <HStack my={4} p={4}>
                < RiSecurePaymentFill className='razorpayicon'/>
                <Heading size={'xs'} fontFamily={'sans-serif'} textTransform={'uppercase'} children="Payment is secured by Razorpay"/>
            </HStack>
        </Container>
    </>
  )
}

export default About