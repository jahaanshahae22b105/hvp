import { Box, Button, Card, Center, Heading, IconButton, useToast } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Text
  } from '@chakra-ui/react';
import { DASHBOARD, LOGIN, REGISTER } from "../../data/routes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth, useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate";

import { useEffect } from "react";


export default function Login(){


    //to check if user is already logged in. navigate to dashboard.
    const navigate = useNavigate();
    const {user, isLoading: authIsLoading} = useAuth();
    const toast = useToast();
    




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
        <Center w="100%" h="100vh"  
            backgroundImage={"url('https://firebasestorage.googleapis.com/v0/b/hackathonportalmvp.appspot.com/o/body-background.png?alt=media&token=5629b9af-87cb-40ab-b678-79dead48845d')"} 
            backgroundPosition="center" 
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Box
                w="45vh" 
                h="-moz-max-content" 
                maxW="45vh" 
                p="9"
            

            >
                <Heading mb="4" size="md" color="whitesmoke" textAlign="left">
                    Sign In
                </Heading>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel fontSize="12" color="whitesmoke">Email</FormLabel>
                        <Input 
                            
                            type='email' 
                            size="lg"
                            fontSize="13"                    
                            placeholder="" 
                            color="white"
                            backgroundColor="rgba(255, 255, 255, 0.2)"
                            
                            {...register('email', emailValidate)} 
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel fontSize="12" color="whitesmoke">Password</FormLabel>
                        <Input 
                            
                            type='password' 
                            size="lg"
                            fontSize="13"
                            placeholder="" 
                            color="white"
                            backgroundColor="rgba(255, 255, 255, 0.2)"
                            {...register('password', passwordValidate)} 
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Center mt="2">
                        <Button mr="1" size="lg"  fontSize="13" width="full" color="white" _hover={{color: "black", backgroundColor: "whitesmoke", transition: "0.4s"}} backgroundColor="#668cff" type="submit" isLoading={isLoading}>
                            Log In
                        </Button>
                        

                    </Center>
                </form>
                <Center>
                    <Text mt="2" fontSize="13" color={"whitesmoke"}>
                        Don't have an account?{" "}
                        <Link as={RouterLink} to={REGISTER} color="white" fontWeight="md" fontSize="13" _hover={{background: 'blue:100'}} textDecor="underline">
                            Sign Up
                        </Link>
                    </Text>
                </Center>
                
                


            </Box>
        </Center>
    )

}