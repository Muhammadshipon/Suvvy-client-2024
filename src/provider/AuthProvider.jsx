import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  // const axiosPublic = useAxiosPublic();
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password);
  }

 const signIn = (email,password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth,email,password);
 } 

 const googleSignIn = ()=>{
  setLoading(true)
  return signInWithPopup(auth,googleProvider);
 }

 const updateUserProfile = (name,image)=>{
 
  return updateProfile(auth.currentUser, {
    displayName: name, photoURL: image
  })
 }

 const logOut = ()=>{
  setLoading(true)
  return signOut(auth);
 }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setLoading(false);
      // if(currentUser){
      //     // get token and stored client 
      //     const userInf = {email: currentUser.email}
      //     axiosPublic.post('/jwt',userInf)
      //     .then(res=>{
      //       if(res.data.token){
      //         localStorage.setItem('access-token',res.data.token);
      //         setLoading(false);
      //       }
      //     })
      // }
      // else{
      //       // remove token 
      //       localStorage.removeItem('access-token')
      //       
      // }
     
    })
    return ()=>{
      return unsubscribe();
    }
  },[])

  const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      googleSignIn,
      updateUserProfile,
      logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider >
  );
};

export default AuthProvider;