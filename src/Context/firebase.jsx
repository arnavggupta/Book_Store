  import { createContext,useContext,useEffect,useState } from "react";
  import { initializeApp } from "firebase/app";

  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut } from "firebase/auth";

  import {getFirestore,addDoc,collection,getDocs,getDoc,doc} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"
  const FirebaseContext= createContext(null);



  const firebaseConfig = {
    apiKey: "AIzaSyA-iXw2ZgOfA6-nY4lDRWzMJ5lGNFYGK2c",
    authDomain: "book-store-37d10.firebaseapp.com",
    projectId: "book-store-37d10",
    storageBucket: "book-store-37d10.appspot.com",
    messagingSenderId: "703406122813",
    appId: "1:703406122813:web:0a7c06362217f33b00c754"
  };

  const app= initializeApp(firebaseConfig);

  export const useFirebase=()=> useContext(FirebaseContext);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
const Firestore= getFirestore(app);
const storage = getStorage(app);
  export const FirebaseProvider= (props)=>{
  const[user,setuser]=useState(null);

    useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
if(user)setuser(user);
else setuser(null);
  })
  },[])

    const signup=async(email,password)=>{
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
    console.log("signup sucessfully");
    console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error);
      
    
      });
      
    
    }

  const Login=async(email,password)=>{


    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
    console.log(userCredential)
      // ...
    })
    .catch((error) => {
  console.log(error)
    });
  }

  const SignwithGoogle=()=>{

    signInWithPopup(auth, provider)
    .then((result) => {
      
      
      console.log(result);
  
    }).catch((error) => {
      
      console.log(error);
      
    });
  }

  const isloggedin=()=>{

    if(user){
      return true;
    }
    else{
      return false;
    }

  }
  console.log(user);
  const addlisting=async (name,isbn,price,pic)=>{
try{
  const imageref= ref(storage , `users/books/${Date.now()}-${pic.name}`);
const uploadresult=await uploadBytes(imageref, pic);
// const download= await getDownloadURL(imageref);

await addDoc(collection(Firestore,"books"),{
name,
 isbn,
 price,
 urlimage:uploadresult.ref.fullPath,
 username: user.displayName,
 useremail:user.email
});


}
catch(err){
  console.log(err);
}
  }

const  getListing=async ()=>{
try{
return  await getDocs(collection(Firestore,"books"));
}

catch(err){
  console.log(err);
}
}

const getimage=(path)=>{
return getDownloadURL(ref(storage,path));
}
const getdocbyid=async(id)=>{

  try {
    const docref= doc(Firestore,"books",id);
    const result = await getDoc(docref);
  return result
    console.log("Cached document data:");
  } catch (e) {
    console.log( e);
  }
}

const logout=()=>{
  signOut(auth).then(() => {
   console.log("Logout Sucessful")
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });

}

const addorderes= async(bookid,formdata,quant)=>{

const docreferences= collection(Firestore,"books",bookid,"orders");

try {
  const result= await addDoc(docreferences,{
    username: formdata.name,
    email:formdata.email,
    landmark:formdata.landmark,
     pincode:formdata.pincode,
     quantity:quant
    });
      
} catch (error) {
console.log(error) ; 
}


}


    return  <FirebaseContext.Provider value={{signup,Login,SignwithGoogle,isloggedin,addlisting,getListing,getimage,getdocbyid,logout,addorderes}}>{props.children}</FirebaseContext.Provider>
  }


