import { useState, useEffect } from "react";
// used for medicien server
import axios from 'axios'
import Swal from 'sweetalert2'
import Dropdown from "components/dropdown";
import BannerPrescription from "./BannerPrescription";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "views/admin/marketplace/components/HistoryCard";
import TopCreatorTable from "views/admin/marketplace/components/TableTopCreators";
import NftCardPrescription from "components/card/NftCardPrescription";
// import './index.css'



// used for modal for medicine add
import { Modal } from 'antd';

// used for delete medicine all data from database by dropdown button\import { DownOutlined } from '@ant-design/icons';
import { Select, Option } from "@material-tailwind/react";

// used for medicine edit drawer
import { Drawer } from 'antd';
import { Link, useParams } from "react-router-dom";



// this part used for recent added card
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';
// import src from "tailwindcss-rtl";


// used for dynamic form
import { Container, Row, Col, Button, Form } from "react-bootstrap";





const Prescribtion = () => {


  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
    const [Product_Name, setProductName] = useState('');
    const [Price, setPrice] = useState('');
    const [Type, setType] = useState('');
     // Sample types for the combo box
     const productTypes = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
      { id: 3, name: 'Food' },
      { id: 4, name: 'Furniture' },
      { id: 5, name: 'Toys' },
  ];

    const uploadProduct = async () => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1]; // Get Base64 data
            const mimeType = file.type; // Get MIME type
            await axios.post('http://localhost:8081/Product_insert', { Product_Name, Type, Price, image: base64Image, mimeType });
            fetchProducts();
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:8081/productsDis');
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
  
 






  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">



      <div className="col-span-1 h-fit w-full xl:col-span-3 2xl:col-span-3">
        {/* NFt Banner */}
        <BannerPrescription />
      </div>


      <div>
            <h1>Product Upload</h1>
            <input
                type="text"
                placeholder="Product Name"
                value={Product_Name}
                onChange={e => setProductName(e.target.value)}
            />
            <select
                value={Type}
                onChange={e => setType(e.target.value)}
                required
            >
                <option value="">Select Type</option>
                {productTypes.map(type => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Price"
                value={Price}
                onChange={e => setPrice(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            <button onClick={uploadProduct}>Upload Product</button>

            <h2>Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <h3>{product.Product_Name}</h3>
                        <p>Type: {product.Type}</p>
                        <p>Price: ${product.Price}</p>
                        <img
                            src={`data:${product.mimeType};base64,${product.image}`}
                            alt="Product"
                            style={{ width: '200px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
      

    </div>
  )
}

export default Prescribtion