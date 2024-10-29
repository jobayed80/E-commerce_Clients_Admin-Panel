const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');


const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for large images
// app.use(express.json())


// Configure multer for file uploads for update products
const upload = multer();


//create db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fashion-ecommerce"

})

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});








// Route to insert product information
app.post('/Product_insert', (req, res) => {
  const { Product_Name, Type, Price, image, mimeType } = req.body; // Get product data and image
  const sql = 'INSERT INTO shop (Product_Name, Type, Price, image, mimeType) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [Product_Name, Type, Price, Buffer.from(image, 'base64'), mimeType], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Product uploaded!', id: result.insertId });
  });
});

// Route to fetch products display
app.get('/productsDis', (req, res) => {
  db.query('SELECT * FROM shop ORDER BY Id DESC', (err, results) => {
      if (err) throw err;
      res.json(results.map(row => ({
          Id: row.Id,
          Product_Name: row.Product_Name,
          Type: row.Type,
          Price: row.Price,
          image: Buffer.from(row.image).toString('base64'),
          mimeType: row.mimeType
      })));
  });
});


// product id generated
app.get('/getProductId', (req, res) => {
  const query = 'SELECT MAX(Id) AS max_id FROM shop';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const maxId = results[0].max_id;
    res.json({ max_id: maxId });
  });
});

app.get('/data', (req, res) => {
  const query = 'SELECT * FROM shop ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Delete the Records by id
app.delete("/delete_product/:id", (req, res) => {
  let sql = "DELETE FROM shop WHERE Id= ?";
  const id = req.params.id
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Student Deleted Failed" });
    return res.json(result)

  });
});

//   delete all data for medicine
app.delete('/deleteAll_Product_Data', (req, res) => {
  const query = 'DELETE FROM shop';

  db.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json({ success: true, message: 'All data deleted successfully.' });
  });
});


// individual details display for product
app.get("/productDetails/:Id", (req, res) => {
  const  {Id}  = req.params;
  db.query('SELECT * FROM shop WHERE Id = ?', [Id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = result[0];
    const base64Image = user.image.toString('base64'); // Convert buffer to Base64
    res.json({ ...user, image: base64Image });
  });
});



// Route to update a product by ID

app.put('/productUpdate/:Id', upload.single('image'), (req, res) => {
  const { Id } = req.params;
  const { Product_Name, Price, Type, isImageUpdated  } = req.body;
  // const image = req.file ? req.file.buffer : null;
  // const query = 'UPDATE shop SET Product_Name = ?, Price = ?, Type = ?, image = ? WHERE Id = ?';
  // const values = [Product_Name, Price, Type, image, Id]
   // If `isImageUpdated` is true and an image is provided, include it in the update

  //  ekhane mane holo jodi image updat korte cai tahole
   const query = isImageUpdated === 'true' && req.file
   ? 'UPDATE shop SET Product_Name = ?, Price = ?, Type = ?, image = ? WHERE Id = ?'
   : 'UPDATE shop SET Product_Name = ?, Price = ?, Type = ? WHERE Id = ?';

   const values = isImageUpdated === 'true' && req.file
   ? [Product_Name, Price, Type, req.file.buffer, Id]
   : [Product_Name, Price, Type, Id];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated successfully' });
  });
});









// Route to get the count of a specific product
app.get('/api/products/count/:name', (req, res) => {
  const ProductName = req.params.name;
  const query = 'SELECT COUNT(*) AS count FROM shop WHERE Type = ?';

  db.query(query, [ProductName], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ count: results[0].count });
  });
});





// Route to fetch products with optional search by product type individual
app.get('/SearchProduct_Type', (req, res) => {
  const { type } = req.query;
  let sql = 'SELECT * FROM shop ';
  let params = [];

  // If a type is provided, modify the SQL query to include a WHERE clause
  if (type) {
      sql += ' WHERE Type = ?';
      params.push(type);
  }
  // Add ORDER BY clause to sort in descending order by id (or any other column)
  sql += ' ORDER BY Id DESC';


  db.query(sql, params, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          return res.status(500).json({ message: 'Failed to fetch products' });
      }
      // Convert image buffer to base64 for each product
      res.json(results.map(row => ({
          id: row.Id,
          Product_Name: row.Product_Name,
          Type: row.Type,
          Price: row.Price,
          image: Buffer.from(row.image).toString('base64'),
          mimeType: row.mimeType
      })));
  });
});










app.get('/', (req, res) => {
  return res.json("From Backend Jobayed hossain")
})

app.listen(8081, () => {
  console.log("listening")
})