import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton =({url="/",title="Home",onClose})=>(
    <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
    </Link>
)

const Header = ({isAuthenticated = false,user}) => {
    
    const dispatch = useDispatch();

    const logoutHandler = (e)=>{
        e.preventDefault();
        onClose();
        dispatch(logout());
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <ColorModeSwitcher />
            <Button width={12} height={12} rounded={'full'} colorScheme='purple' position={'fixed'} top={6} left={6}
                onClick={onOpen}
                zIndex={'overlay'}
            >
                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay backdropFilter={'blur(8px)'} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>
                        COURSE BUNDLER
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4} alignItems={'flex-start'}>
                        <LinkButton onClose={onClose}  url="/"  title="Home"/>
                        <LinkButton onClose={onClose}  url="/courses"  title="Browse All Courses"/>
                        <LinkButton onClose={onClose}  url="/request"  title="Request a Courses"/>
                        <LinkButton onClose={onClose}  url="/contact"  title="Contact Us"/>
                        <LinkButton onClose={onClose}  url="/about"  title="About"/>

                        <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
                            {isAuthenticated ? (
                                <>
                                <VStack>
                                    <HStack>
                                        <Link onClick={onClose}  to={'/profile'}>
                                            <Button variant={'ghost'} colorScheme='purple'>Profile</Button>
                                        </Link>
                                            <Button variant={'ghost'} onClick={logoutHandler}>
                                                <RiLogoutBoxLine/>
                                                Log Out
                                            </Button>
                                    </HStack>
                                    {(user && user.role ==="admin") || user?.user && user?.user?.role ==="admin" && <Link onClick={onClose}  to={'/admin/dashboard'}>
                                        <Button colorScheme='purple' margin={'4px'}>
                                            <RiDashboardFill/>
                                            Dashboard
                                        </Button>
                                    </Link>  }
                                </VStack>
                                </>
                            ):(
                                <>
                                    <Link onClick={onClose}  to={'/login'}>
                                        <Button colorScheme='purple'>
                                            Login
                                        </Button>
                                    </Link>
                                    <p>OR</p>
                                    <Link onClick={onClose}  to={'/register'}>
                                        <Button colorScheme='purple'>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </HStack>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header