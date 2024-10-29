const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for large images
// app.use(express.json())


// used for images
const multer = require('multer');
const path = require('path'); 



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



// used for image add in database
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(null, Error("only image is allowd"))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: isImage
});

app.use("/uploads", express.static("./uploads"))





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
app.get("/productDetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM shop WHERE Id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update the Records medicine
app.put("/product/update/:id", (req, res) => {
  let sql =
    "UPDATE shop SET Product_Name='" +
    req.body.Product_Name +
    "', Price='" +
    req.body.Price +
    "',Type='" +
    req.body.Type +

    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
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


app.get('/api/count/:productShoes', (req, res) => {
  const productShoes = req.params.productShoes;
  const query = 'SELECT COUNT(*) AS totalCount FROM shop WHERE Type = ?';
  db.query(query, [[productShoes]], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ totalCount: results[0].totalCount });
  });
});

app.get('/api/count/:productJacket', (req, res) => {
  const productJacket = req.params.productJacket;
  const query = 'SELECT COUNT(*) AS totalCount FROM shop WHERE Type = ?';
  db.query(query, [[productJacket]], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ totalCount: results[0].totalCount });
  });
});
app.get('/api/count/:productHeadphone', (req, res) => {
  const productHeadphone = req.params.productHeadphone;
  const query = 'SELECT COUNT(*) AS totalCount FROM shop WHERE Type = ?';
  db.query(query, [[productHeadphone]], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ totalCount: results[0].totalCount });
  });
});
app.get('/api/count/:productBlazers', (req, res) => {
  const productBlazers = req.params.productBlazers;
  const query = 'SELECT COUNT(*) AS totalCount FROM shop WHERE Type = ?';
  db.query(query, [[productBlazers]], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ totalCount: results[0].totalCount });
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