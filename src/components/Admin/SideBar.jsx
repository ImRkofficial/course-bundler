import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill,RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
    const location = useLocation();
  return (
    <>
    <VStack p={16} spacing={8} boxShadow={`-2px 0px 10px rgba(107,70,193,0.5)`}>
    <LinkButton Icon={RiDashboardFill} text={'Dashboard'}  url={'dashboard'} active={location.pathname === '/admin/dashboard'}  />
    <LinkButton Icon={RiAddCircleFill} text={'Create Course'}  url={'createcourse'} active={location.pathname === '/admin/createcourse'} />
    <LinkButton Icon={RiEyeFill} text={'Courses'}  url={'courses'} active={location.pathname === '/admin/courses'} />
    <LinkButton Icon={RiUser3Fill} text={'Users'}  url={'users'} active={location.pathname === '/admin/users'} />
    </VStack>
    </>
  )
}

export default SideBar;

function LinkButton({url,Icon,text,active}){
    return(
        <Link to={`/admin/${url}`}>
        <Button colorScheme={active ? 'purple' :'white'} fontSize={'larger'} variant={'ghost'}>
            <Icon style={{margin:'4px'}}/>
            {text}
        </Button>
        </Link>
    )
}