import React, {useState ,useEffect} from 'react'
import {Modal} from 'antd'

// logout firebase
import { getAuth, signOut } from "firebase/auth";
import { onAuthStateChanged 
} from 'firebase/auth'
import Swal from 'sweetalert2'

import BannerPrescription from 'views/Prescription/BannerPrescription';

const Ambulance = () => {

  let auth = getAuth()
    // logout
  let handleLogout = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Logout Successfully"
      });
      navigator('/admin/authentication/signinAuth')
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(()=>{
    handleLogout()
  })

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">

      <div className="col-span-1 h-fit w-full xl:col-span-3 2xl:col-span-3">


      </div>
    </div>





  )
}

export default Ambulance