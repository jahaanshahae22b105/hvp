import { useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'lib/firebase';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc} from 'firebase/firestore';
import isUsernameExists from 'utils/isUsernameExists';
import isEmailExists from 'utils/isEmailExists';

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data());
        setLoading(false);
      }
  
      if (!authLoading) {
        if (authUser) fetchData();
        else setLoading(false); // Not signed in
      }
    }, [authLoading]);
  
    return { user, isLoading, error };
}

export function useLogin () {
    const [isLoading, setLoading] = useState(false);
    const toast =useToast();
    const navigate = useNavigate();

    async function login({email, password, redirectTo=DASHBOARD}) 
    {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful.",
                status: "success",
                isClosable: true,
                position: "bottom",
                duration: 3000,
            });
            navigate(redirectTo);
        }
        catch (error) {
            toast({
                title: "Login Failed.",
                status: "error",
                description: error.message,
                isClosable: true,
                position: "bottom",
                duration: 5000,
            });
            setLoading(false);
            return false;
        }

        setLoading(false);
        return true;
    }

    return {login, isLoading};
}



export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = DASHBOARD,
    }) 
    {

      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
      const emailExists = await isEmailExists(email);
  
      if (usernameExists) 
      {
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 3000,
        });
        setLoading(false);
      } 
      else if (emailExists)
      {
        toast({
            title: "Email already exists",
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 3000,
          });
          setLoading(false);
      } 
      else 
      {
        try 
        {
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            email: email,
            avatar: "",
            date: Date.now(),
          });
  
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "bottom",
            duration: 3000,
          });
  
          navigate(redirectTo);
        } 
        catch (error) 
        {
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });
        } 
        finally 
        {
          setLoading(false);
        }
      }

    }
  
    return { register, isLoading };
  }



export function useLogout() {

    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
   

    async function logout() {

        if (await signOut())
        {
            toast({
                title: "Logged Out.",
                status: "success",
                isClosable: true,
                position: "bottom",
                duration: 3000,
            })
            navigate(LOGIN);
        }

    }

    return {logout, isLoading};

}