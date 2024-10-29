import React from 'react'

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import InputField from 'components/fields/InputField';
import { FcGoogle } from "react-icons/fc";
import Checkbox from 'components/checkbox';

import authImg from "assets/img/auth/banner.jpg";
import Footer from 'components/footer/FooterAuthDefault';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';

// /used DRAWER
import { Drawer, Modal, Button, Image } from 'antd';


const Update = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const [productDetails, setProductDetails] = useState([]);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  console.log("jon"+image)

  useEffect(() => {
    axios.get("http://localhost:8081/productDetails/" + id)
      .then(res => {
        // console.log(res)
        setProductDetails(res.data[0]);
      })
      .catch(err => console.log(err))
  }, []);


  useEffect(() => {
    // setOpen(true)
    axios.get("http://localhost:8081/productDetails/" + id)
      .then(res => {

        setValues({ ...values, Product_Name: res.data[0].Product_Name, Price: res.data[0].Price, Type: res.data[0].Type });
      })
      .catch(err => console.log(err))
  }, []);

  const [values, setValues] = useState({
    // Id: "",
    Product_Name: "",
    Price: "",
    Type: "",

  })



  // update
  const handleUpdate = (e) => {
    // e.preventDefault();
    // axios.put("http://localhost:8081/product/update/" + id, values)
    //   .then(res => {
    //     console.log("edit" + res)
    //     // navigate('/admin/nft-marketplace')
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: "top-end",
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.onmouseenter = Swal.stopTimer;
    //         toast.onmouseleave = Swal.resumeTimer;
    //       }
    //     });
    //     Toast.fire({
    //       icon: "success",
    //       title: "Updated medicine data"
    //     });
    //   })
      console.log(values)
  }

  return (

    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">

        <Link to="/admin/medicine" className="mt-0 w-max lg:pt-4 lg:pl-4">
          <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer text-lg text-green-50">
            <svg
              width="20"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                fill="#A3AED0"
              />
            </svg>
            <p className='text-blue-900'>Back</p>
          </div>
        </Link>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Product Modified
              </h1>
              <hr className='h-2 bg-red-600 text-2xl'></hr>

            </div>
            <div className="w-full flex-1 mt-8">



              <form>
                <div class="space-y-5">

                  <div class="border-b border-gray-900/10 pb-0">
                    {/* <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    <div class="sm:col-span-3 grid grid-col-1">
                      <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product ID</label>
                      <div class="mt-2">
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={id} readonly></input>
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                        <div class="mt-2">
                          <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={values.Type} ></input>
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Product Brand</label>
                        <div class="mt-2">
                          <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={e => setValues({ ...values, Product_Name: e.target.value })} value={values.Product_Name}></input>
                        </div>
                      </div>



                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product Price</label>
                    <div class="mt-2">
                      <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={e => setValues({ ...values, Price: e.target.value })} value={values.Price}></input>
                    </div>
                  </div>


                </div>
                <div class="mt-2 flex gap-5 items-center justify-center rounded-full w-50 h-50">
                  <div className='rounded-full border-2'>
                    <Image
                      width={100}
                      height={100}
                      src={image ? image : `http://localhost:8081/${productDetails.imagePath}`}
                    />
                  </div>
                </div>


                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <Link to="/admin/medicine" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                  <button onClick={handleUpdate}   class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>


              </form>

            </div>
          </div>
        </div>

        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          >

          </div>
        </div>

      </div>
    </div>


  )
}

export default Update