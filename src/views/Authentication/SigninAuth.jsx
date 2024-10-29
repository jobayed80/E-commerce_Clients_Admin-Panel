import React, { useEffect, useState } from 'react'
import imageBanner from '../../assets/img/background.png'
import { Link, useNavigate } from 'react-router-dom'

import { Alert } from 'antd'

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {
    signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber,
    sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider,
    GithubAuthProvider, signOut, onAuthStateChanged
} from 'firebase/auth'

import Swal from 'sweetalert2'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


const SigninAuth = () => {


    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [emailAdmin, setEmailAdmin] = useState('')
    const [passAdmin, setPassAdmin] = useState('')
    let [firebaseError, setFirebaseError] = useState("")

    //    Sign in Successfully sweet alert2
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    let verificationEmail = () => {
        Swal.fire({
            imageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--1II67h1R--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://faruknasir.com/images/blog/2021/verification_url.png',
            imageWidth: 450,
            imageHeight: 220,
            imageAlt: 'Custom image',
            title: 'Sorry!',
            text: 'Please check your email! — check it out!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            showConfirmButton: true,



        }).then((result) => {
            if (result.isConfirmed) {

                navigate('/admin/authentication/signinAuth')

            }
        })
    }

    let handleSubmitEmailPass = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)

                //   email verification checked
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        if (user.emailVerified) {
                            navigate('/admin/default')
                        }
                        else {
                            verificationEmail()
                        }
                    }
                })

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //   console.log(errorMessage)
                console.log(errorCode)
                //   used for erro message
                Swal.fire({
                    title: "Email/Password incorrect!",
                    showClass: {
                        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
                    },
                    hideClass: {
                        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
                    }
                });
            });
    }

    let handleSubmitEmailPassAdmin = () => {
        if (emailAdmin === 'admin2948@gmail.com' && passAdmin === 'admin2948') {
            // Do something if the credentials are correct (e.g., navigate to a different page)
            navigate('/Admin/dashboard')
          } else {
            // Do something if the credentials are incorrect (e.g., display an error message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "email or password is incorrect!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
          }
    }



    let navigate = useNavigate()
    let auth = getAuth();


    const handleSubmitGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                navigate('/admin/default')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                console.log(email)
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(credential)
                // ...
            });
    }

    // jodi email verified hoi tahole sorasori home page noito login page
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // setEmailVerification(userail.emVerified) //if the emailVerified is false then this statement is working
                if (user.emailVerified) {
                    navigate('/admin/default')
                }
                else {
                    navigate('/admin/authentication/signinAuth')
                }

            }
        })
    }, [])

    return (
        <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                            class="w-mx-auto" />
                    </div>
                    <h1 class="mt-5 text-2xl xl:text-3xl font-extrabold text-center">
                        Sign In
                    </h1>
                    <div class="mt-12 flex flex-col items-center">
                        <div class="w-full flex-1 mt-">
                            <div class="flex flex-col items-center">
                                <button
                                    onClick={handleSubmitGoogle}
                                    class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div class="bg-white p-2 rounded-full">
                                        <svg class="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span class="ml-4">
                                        Sign In with Google
                                    </span>
                                </button>

                            </div>

                            <div class="my-8 border-b text-center">
                                <div
                                    class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign In with Cartesian E-mail
                                </div>
                            </div>

                            {/* <div class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <button
                           
                            class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-">
                                <Link to={'/admin/default'}>Sign In</Link>
                            </span>
                        </button>
                        <p>Don't have an account? <Link to={`/admin/authentication/signupAuth`}>SignUp</Link></p>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by Cartesian Kinetics
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </div> */}


                            <Tabs isFitted variant='enclosed'  colorScheme='green'>
                                
                                <TabPanels>
                                    <TabPanel>
                                        <div class="max-w-sm mx-auto mt-6">
                                            <div class="mb-5">
                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input type="email" id="email" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required
                                                    value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                            </div>
                                            <div class="mb-5">
                                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                                <input type="password" id="password" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********"  required
                                                    value={pass} onChange={(e) => setPass(e.target.value)}></input>
                                            </div>
                                            <div class="flex items-start mb-5">
                                                <div class="flex items-center h-5">
                                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required></input>
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                            </div>
                                            <button
                                                onClick={handleSubmitEmailPass}

                                                class="mt-5 mb-1 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                                <span class="ml-">
                                                    Sign In
                                                </span>
                                            </button>

                                            <span className='text-sm text-gray-700'>Don't have an account? <Link to={`/admin/authentication/signupAuth`}>SignUp</Link></span>
                                            <p class="mt-6 text-xs text-gray-600 text-center">
                                                I agree to abide by Cartesian Kinetics
                                                <a href="#" class="border-b border-gray-500 border-dotted">
                                                    Terms of Service
                                                </a>
                                                and its
                                                <a href="#" class="border-b border-gray-500 border-dotted">
                                                    Privacy Policy
                                                </a>
                                            </p>


                                        </div>
                                    </TabPanel>
                                    
                                </TabPanels>
                            </Tabs>                  
                           


                        </div>
                    </div>
                </div>
                <div class="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                        <img src={imageBanner} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninAuth