
import {createContext,useState, useEffect} from 'react'
import {auth,firebase} from '../services/firebase'


export const AuthContext= createContext({});



export function AuthContextProvider(props){



    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
          if(user){
            const {displayName,photoURL,uid} = user;
        
            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Acount')
            }
        
            setUser({
              id:uid,
              name:displayName,
              avatar: photoURL
            })
          }
        })
        return()=>{
          unsubscribe()
        }
        }, [])
        
        
        
        const [user,setUser] = useState()
        
        async function sigInWithGoogle(){
        
          const provider = new firebase.auth.GoogleAuthProvider();
        
        const result = await  auth.signInWithPopup(provider)
        if(result.user)  {
          const {displayName,photoURL,uid} = result.user;
        
            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Acount')
            }
        
            setUser({
              id:uid,
              name:displayName,
              avatar: photoURL
            })
        
          
          }
        
         
        
        
        }


    return (
<AuthContext.Provider value={{user, sigInWithGoogle}}>
    {props.children}
</AuthContext.Provider>


    )
}