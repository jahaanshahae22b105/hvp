import { Box, Button, Center, Heading, IconButton } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Text
  } from '@chakra-ui/react';
import { DASHBOARD, REGISTER } from "lib/routes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {useAuth, useLogin} from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { TextField } from "@mui/material";

export default function Login(){


    //to check if user is already logged in. navigate to dashboard.
    const navigate = useNavigate();
    const {user, isLoading: authIsLoading} = useAuth();
    useEffect(() => {

        if (user)
        {
            navigate(DASHBOARD);
        }
        
    }, [user, authIsLoading])




    const {login, isLoading} = useLogin();
    const {
        register, 
        handleSubmit, 
        reset,
        formState: {errors},
    } = useForm();


    async function handleLogin (data) {
       
        const succeeded = await login({
            email: data.email,
            password: data.password,
            redirectTo: DASHBOARD,
        });

        if (succeeded) reset();
    }


    return (
        <Center w="100%" h="100vh">
            <Box w="45vh" h="-moz-max-content" maxW="45vh" p="9" >
                <Heading mb="4" size="md" textAlign="center">
                    Log In
                </Heading>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel fontSize="12" color="gray">Email</FormLabel>
                        <Input 
                            borderRadius="50vh"
                            type='email' 
                            size="lg"
                            fontSize="13"
                            placeholder="user@abc.com" 
                            {...register('email', emailValidate)} 
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel fontSize="12" color="gray">Password</FormLabel>
                        <Input 
                            borderRadius="50vh"
                            type='password' 
                            size="lg"
                            fontSize="13"
                            placeholder="••••••••" 
                            {...register('password', passwordValidate)} 
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Center mt="2">
                        <Button mr="1" size="lg" borderRadius="50vh" fontSize="13" width="full" colorScheme="blue" type="submit" isLoading={isLoading}>
                            Log In
                        </Button>
                        

                    </Center>
                </form>
                <Center>
                    <Text mt="2" fontSize="13">
                        Don't have an account?{" "}
                        <Link as={RouterLink} to={REGISTER} color="blue.800" fontWeight="md" fontSize="13" _hover={{background: 'blue:100'}} textDecor="underline">
                            Sign Up
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