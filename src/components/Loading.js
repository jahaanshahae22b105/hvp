import { Center, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export default function Loading (){
    return (
        <>

            <Center w="100%" h="100vh">

                <CircularProgress isIndeterminate color='teal.300' thickness="9" />

            </Center>
            
        </>
    )
}

