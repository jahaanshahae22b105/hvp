import { Box, Button, Center, Heading, IconButton, Image } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Text
  } from '@chakra-ui/react';
import { DASHBOARD, LOGIN } from "lib/routes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {useAuth, useRegister} from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate } from "utils/form-validate";
import {FaGoogle} from 'react-icons/fa'
import { useEffect } from "react";

export default function Register(){


    //to check if user is already logged in. navigate to dashboard.
    const navigate = useNavigate();
    const {user, isLoading: authIsLoading} = useAuth();
    useEffect(() => {

        if (user)
        {
            navigate(DASHBOARD);
        }
        
    }, [user, authIsLoading])





    const {register : signup, isLoading} = useRegister();
    const {
        register, 
        handleSubmit, 
        reset,
        formState: {errors},
    } = useForm();

    

    async function handleRegister (data) {
       
        const succeeded = await signup({
            username: data.username,
            email: data.email,
            password: data.password,
            redirectTo: DASHBOARD,
        });

        if (succeeded) reset();
    }


    return (
        <Center w="100%" h="100vh" >
            <Box w="45vh" h="-moz-max-content" maxW="45vh" p="9" >
                <Heading mb="4" size="md" textAlign="center">
                    Sign Up
                </Heading>
                <form onSubmit={handleSubmit(handleRegister)}>

                    <FormControl isInvalid={errors.username} py="2">
                        <FormLabel fontSize="12" color="gray">Username</FormLabel>
                        <Input 
                            borderRadius="50vh"
                            placeholder="username" 
                            size="lg"
                            fontSize="13"
                            {...register('username', usernameValidate)} 
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel fontSize="12" color="gray">Email</FormLabel>
                        <Input 
                            borderRadius="50vh"
                            type='email' 
                            placeholder="user@abc.com"
                            size="lg"
                            fontSize="13" 
                            {...register('email', emailValidate)} 
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel fontSize="12" color="gray">Password</FormLabel>
                        <Input 
                            borderRadius="50vh"
                            type='password' 
                            placeholder="••••••••" 
                            size="lg"
                            fontSize="13"
                            {...register('password', passwordValidate)} 
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Center mt="2" >
                        <Button mr="1" borderRadius="50vh" size="lg" fontSize="13" width="full" colorScheme="blue" type="submit" isLoading={isLoading}>
                            Create Account
                        </Button>
                    
                    </Center>
                </form>

                <Center>
                    <Text mt="2" fontSize="13">
                        Already have an account?{" "}
                        <Link as={RouterLink} to={LOGIN} color="blue.800" fontWeight="md" fontSize="13" _hover={{background: 'blue:100'}} textDecor="underline">
                            Log In
                        </Link>
                    </Text>
                </Center>
                <Center>
                    <Text mt="10" fontSize="13">
                        or sign in with
                    </Text>
                </Center>
                <Center>
                    <IconButton mt="2" icon={<FaGoogle/>} borderRadius="50vh" size="md" fontSize="12" width="vh" colorScheme="gray"  isLoading={false}>

                    </IconButton>
                </Center>
                


            </Box>
        </Center>
    )
}