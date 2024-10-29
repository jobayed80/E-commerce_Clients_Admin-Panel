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
import { Image } from 'antd';



const Update = () => {

  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  const { Id } = useParams();
  const [product, setProduct] = useState({ Product_Name: '', Price: '', Type: '', image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const productTypes = ["Clothing", "Kids Fashion", "Shoes", "Activewear", "Tech Accessories", "Cosmetics"];
  // search by id with display data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/productDetails/${Id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchProduct();
  }, [Id]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setIsImageUpdated(true);
    setPreview(URL.createObjectURL(selectedFile)); // Set preview to show selected image

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Product_Name', product.Product_Name);
    formData.append('Price', product.Price);
    formData.append('Type', product.Type);
    formData.append('isImageUpdated', isImageUpdated); // Add flag to formData
    // Only add the image if isImageUpdated is true
    if (isImageUpdated && file) {
      formData.append('image', file);
    }

    try {
      await axios.put(`http://localhost:8081/productUpdate/${Id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated product",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/admin/medicine');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


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


            {/* <div>
              <h2>Update Product</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="Product_Name"
                    value={product.Product_Name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    name="Price"
                    value={product.Price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Type</label>
                  <select

                    name="Type"
                    value={product.Type}
                    onChange={handleInputChange}>
                    <option value="">Select a type</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                </div>

                <div>
                  <label>Image</label>
                  {product.image && (
                    <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={product.Product_Name}
                      width="150"
                    />
                  )}
                  <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Update</button>
              </form>
            </div> */}






            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Product Modified
              </h1>
              <hr className='h-2 bg-red-600 text-2xl'></hr>

            </div>
            <div className="w-full flex-1 mt-8">



              <form onSubmit={handleSubmit}>
                <div class="space-y-5">

                  <div class="border-b border-gray-900/10 pb-0">
                    <div class="sm:col-span-3 grid grid-col-1">
                      <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product ID</label>
                      <div class="mt-2">
                        <input type="text" name="Id" id="Id" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={product.Id} readonly></input>
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                        <div class="mt-2">
                          <input type="text" name="Product_Name" id="Product_Name" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleInputChange} value={product.Product_Name} ></input>
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Product Brand</label>
                        <div class="mt-2">
                          <select class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            name="Type"
                            value={product.Type}
                            onChange={handleInputChange}
                          >
                            <option value="">Select a type</option>
                            {productTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>



                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product Price</label>
                    <div class="mt-2">
                      <input type="text" name="Price" id="Price" autocomplete="given-name" class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleInputChange} value={product.Price}></input>
                    </div>
                  </div>


                </div>
                <div >
                  <div >
                    {/* {product.image && (
                      <Image
                        width={100}
                        height={100}
                        src={`data:${product.mimeType};base64,${product.image}`}
                      />
                    )} */}
                    {/* {preview && (
                      <img
                        src={preview}
                        alt={product.Product_Name}
                        width="150"
                        style={{ display: 'block', marginBottom: '10px' }}
                      />
                    ) || (<Image
                      width={100}
                      height={100}
                      src={`data:${product.mimeType};base64,${product.image}`}
                    />) }  */}
                    <div style={{ display: "flex", alignItems: "center" }} class="mb-4 mt-5 gap-5">
                      
                      {
                          preview && (
                            <div class="h-[140px] w-[140px] rounded-lg">
                              <Image
                                src={preview}
                                alt={product.Product_Name}
                                width="150"
                              />
                            </div>
                            
                          ) || 
                          (
                            <div class="h-[140px] w-[140px] rounded-lg">
                              <Image
                                src={`data:${product.mimeType};base64,${product.image}`}
                              />
                            </div>
                          )
                      }
                      <input
                        class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                        id="formFileSm"
                        type="file"
                        onChange={handleFileChange} />
                    </div>


                  </div>
                </div>


                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <Link to="/admin/medicine" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                  <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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