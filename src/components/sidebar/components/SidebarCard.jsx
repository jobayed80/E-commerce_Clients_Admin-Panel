import React from "react";
import { useState , useEffect} from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged 
} from 'firebase/auth'


const FreeCard = () => {

  let auth = getAuth();
  let [photo, setPhoto] = useState('')
  let [name, setName] = useState('')
  // login verified check for google
  useEffect(()=>{
   onAuthStateChanged(auth, (user) => {
      
             setPhoto(user.photoURL)
             setName(user.displayName)
          
   })
},[])



  return (
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 pb-4">
      <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-[#868CFF] to-brand-500 dark:!border-navy-800">
      <img
                className="h-30 w-30 cursor-pointer border-2 border-gray-300 rounded-full"
                src={photo}
                alt="Elon Musk"
              />
      </div>

      <div className="mt-16 flex h-fit flex-col items-center">
        <p className="text-lg font-bold text-white">Ecommerce Admin panel</p>
        

        <a
          target="blank"
          className="text-medium mt-7 block rounded-full bg-gradient-to-b from-white/50 to-white/10 py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-white/40 hover:to-white/5 "
          href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
        >
          {name}
        </a>
      </div>
    </div>
  );
};

export default FreeCard;
