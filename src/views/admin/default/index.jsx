import MiniCalendar from "components/calendar/MiniCalendar";
import Clothing from "views/admin/default/components/Clothing";
import ShoesTable from "views/admin/default/components/ShoesTable";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import axios from "axios";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import image_1 from '..//..//..//assets/img/dash-1.png'
import image_2 from '..//..//..//assets/img/dash-2.png'

import {
  onAuthStateChanged, getAuth
} from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BlazerTable from "./components/Tech_Accessories";
import Headphone from "./components/Cosmetics";
import Jacket from "./components/Activewear";
import SmartPhone from "./components/Kids_Fashion_Table";
import Kids_Fashion_Table from "./components/Kids_Fashion_Table";
import Activewear from "./components/Activewear";
import Tech_Accessories from "./components/Tech_Accessories";
import Cosmetics from "./components/Cosmetics";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";


const Dashboard = () => {

  let navigate = useNavigate()
  let auth = getAuth();
  let [photo, setPhoto] = useState('')

  // login verified check for google
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // setEmailVerification(userail.emVerified) //if the emailVerified is false then this statement is working
        if (user.emailVerified) {
          navigate('/admin/default')
          setPhoto(user.photoURL)
        }
        else {
          //  emailVerification
        }

      } else {
        navigate('/admin/authentication/signinAuth')
      }
    })
  }, [])



 



  const [Cloth, setCloh] = useState('Clothing');
  const [countCloth, setCountCloth] = useState(null);

  const [Shoes, setShoes] = useState('Shoes');
  const [countShoes, setCountShoes] = useState(0);

  const [KidsFashion, setKidsFashion] = useState('Kids Fashion');
  const [countKidsFashion, setCountKidsFashion] = useState(0);

  const [ActivewearPro, setcActivewearPro] = useState('Activewear');
  const [countActivewearPro, setCountActivewearPro] = useState(0);

  
  const [CosmeticsPro, setcCosmeticsPro] = useState('Cosmetics');
  const [countCosmeticsPro, setCountCosmeticsPro] = useState(0);

  const [Tech_AccessoriesPro	, setTech_AccessoriesPro] = useState('Tech Accessories');
  const [countTech_AccessoriesPro, setCountTech_AccessoriesPro] = useState(0);


 
  //  used foir count of product 1


    const ClothingProductCount = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/products/count/${Cloth}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCountCloth(data.count);
           
        } catch (err) {
          setCountCloth(null);
        }
    };
     useEffect(() => {
      ClothingProductCount();
  }, []);

  const ShoesProductCount = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/products/count/${Shoes}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountShoes(data.count);
       
    } catch (err) {
      // setCountCloth(null);
    }
};
 useEffect(() => {
  ShoesProductCount();
}, []);

const KidsFashionProductCount = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/products/count/${KidsFashion}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountKidsFashion(data.count);
     
  } catch (err) {
    setKidsFashion(null);
  }
};
useEffect(() => {
  KidsFashionProductCount();
}, []);

const ActivewearProductCount = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/products/count/${ActivewearPro}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountActivewearPro(data.count);
     
  } catch (err) {
    setcActivewearPro(null);
  }
};
useEffect(() => {
  ActivewearProductCount();
}, []);

const CosmeticsProductCount = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/products/count/${CosmeticsPro}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountCosmeticsPro(data.count);
     
  } catch (err) {
    setcCosmeticsPro(null);
  }
};
useEffect(() => {
  CosmeticsProductCount();
}, []);

const Tech_AccessoriesProProductCount = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/products/count/${Tech_AccessoriesPro}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountTech_AccessoriesPro(data.count);
     
  } catch (err) {
    setTech_AccessoriesPro(null);
  }
};
useEffect(() => {
  Tech_AccessoriesProProductCount();
}, []);


  


  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-6 w-6" />}
          title={"Clothing"}
          subtitle={countCloth}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Kids Fashion"}
          subtitle={countKidsFashion}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Shoes"}
          subtitle={countShoes}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Tech Accessories"}
          subtitle={countTech_AccessoriesPro}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Activewear"}
          subtitle={countActivewearPro}
        />
   
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Cosmetics"}
          subtitle={countCosmeticsPro}
        />
       
       
      </div>



      {/* <div className="flex flex-row gap-10 ">
        <div class="mt-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          
          <div className="">
            <img className="object-contain mx-auto" src={image_1} alt="" />
          </div>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Medicine</h5>
          </a>
          <p class="mb-3  text-gray-700 dark:text-gray-400 text-3xl font-semibold">{totalCount}</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go to
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>


        <div class="mt-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          
          <div className="">
            <img className="object-contain mx-auto" src={image_1} alt="" />
          </div>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Prescription</h5>
          </a>
          <p class="mb-3  text-gray-700 dark:text-gray-400 text-3xl font-semibold">{totalCountP}</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go to
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>


      </div> */}




      {/* Charts */}.

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Clothing />
        <Kids_Fashion_Table />
        <ShoesTable></ShoesTable>
        <Activewear></Activewear>
        <Tech_Accessories></Tech_Accessories>
        <Cosmetics></Cosmetics>
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <MiniCalendar />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
