import React from "react";
import { useState, useEffect } from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import axios from "axios";

import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "variables/charts";


const Clothing = () => {


  const [searchQuery, setSearchQuery] = useState('Clothing');
  const [products, setProducts] = useState([]);

  const fetchProducts = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQuery }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


    const [productName, setProductName] = useState('');
    const [count, setCount] = useState(null);
    const [error, setError] = useState('');


    const fetchProductCount = async () => {
        try {
            const response = await fetch(`/api/products/count/${productName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCount(data.count);
            setError('');
        } catch (err) {
            setError('Error fetching product count');
            setCount(null);
        }
    };


  return (
    <>

  
   

    <Card extra="!p-[20px] text-center overflow-y-scroll"  style={{height:"50vh"}}>
                <div className="flex justify-between">
                    <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                        <MdOutlineCalendarToday />
                        <span className="text-sm font-medium text-gray-600">Clothing</span>
                    </button>
                    <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                        <MdBarChart className="h-6 w-6" />
                    </button>
                </div>


                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-white capitalize bg-blueSecondary dark:bg-gray-700 dark:text-black">
                            <tr>

                                <th scope="col" class="p-4">ID</th>
                                <th scope="col" class="p-4">Product Name</th>
                                <th scope="col" class="p-4">Brand Name</th>
                                <th scope="col" class="p-4">Image</th>
                                <th scope="col" class="p-4">Prodcut Price</th>

                            </tr>
                        </thead>
                        <tbody>

                            {products.map(function fn(product) {
                                return (
                                    <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">


                                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.id}
                                        </th>

                                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.Type}
                                        </td>

                                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">


                                            {product.Product_Name}

                                        </td>

                                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white rounded-2xl">
                                            <img className="h-20 w-20 object-contain rounded-2xl" src={`data:${product.mimeType};base64,${product.image}`}></img>
                                        </td>
                                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                            {product.Price}
                                        </td>


                                    </tr>

                                );

                            }

                            )}

                        </tbody>
                    </table>


                </div>
            </Card>
    
    </>
  );
};

export default Clothing;
