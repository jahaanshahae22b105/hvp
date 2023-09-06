
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc} from 'firebase/firestore';
import isUsernameExists from '../utils/isUsernameExists';
import isEmailExists from '../utils/isEmailExists';
import { mockUser } from '../data/dataSchema';
import { auth, db, provider } from '../firebase/firebase-config';
import { DASHBOARD, LOGIN, REGISTER } from '../data/routes';

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
    
    const navigate = useNavigate();

    async function login({email, password, redirectTo=DASHBOARD}) 
    {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
           /* toast({
                title: "Login Successful.",
                status: "success",
                isClosable: true,
                position: "bottom",
                duration: 3000,
            });*/
            console.log("Login Successful");
            navigate(DASHBOARD);
        }
        catch (error) {
           /* toast({
                title: "Login Failed.",
                status: "error",
                description: error.message,
                isClosable: true,
                position: "bottom",
                duration: 5000,
            });*/
            console.log("Login Failed");
            console.log(error.message);
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
    
    const navigate = useNavigate();
    
  
    async function register({
      username,
      email,
      password,
      name,
      kaggleID,
      rollNo,
      phoneNo,
      redirectTo = DASHBOARD,
    }) 
    {

      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
      const emailExists = await isEmailExists(email);
  
      if (usernameExists) 
      {
        /*toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 3000,
        });*/
        console.log("Username already exists");
        setLoading(false);
      } 
      else if (emailExists)
      {
        /*toast({
            title: "Email already exists",
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 3000,
          });*/
          console.log("Email exists already");
          setLoading(false);
      } 
      else 
      {
        try 
        {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const newUserData = mockUser;
          newUserData.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
          newUserData.id = res.user.uid;
          newUserData.kaggleID = kaggleID;
          newUserData.rollNo = rollNo;
          newUserData.email = email;
          newUserData.username = username.toLowerCase();
          newUserData.dateOfCreation = Date.now();
          newUserData.phoneNo = phoneNo;

          
          await setDoc(doc(db, "users", res.user.uid), newUserData);
  
          /*toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "bottom",
            duration: 3000,
          });*/
          console.log("account created");
  
          navigate(redirectTo);
        } 
        catch (error) 
        {
          /*toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "bottom",
            duration: 5000,
          });*/
          console.log("Signup failed");
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
    const navigate = useNavigate();
   

    async function logout() {

        if (await signOut())
        {
           /* toast({
                title: "Logged Out.",
                status: "success",
                isClosable: true,
                position: "bottom",
                duration: 3000,
            });*/
            console.log("logged out");
            navigate(LOGIN);
        }

    }

    return {logout, isLoading};

}







