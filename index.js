const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u2izr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();
app.use(express());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("services"));
const port = 8080;


// Root url api
app.get("/", (req, res) => {
    res.send("Welcome to Automobile App Server");
});
  
  
client.connect((err) => {
  
    // Automobile Colletions
    const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");
  
  
  
    // Add product Api
    app.post("/addProduct", (req, res) => {
  
      const file = req.files.image;
      const allData = JSON.parse(req.body.data);
      const newImg = file.data;
      const encodedImg = newImg.toString("base64");
  
      const image = {
        contentType: file.mimetype,
        size: file.size,
        img: Buffer.from(encodedImg, "base64"),
      };
  
      allData.image = image;
      productsCollection.insertOne(allData)
      .then((result) => {
        res.send(result.ops[0]);
      });
  
    
    });
  
  
    //Get All Products Api
    app.get("/products", (req, res) => {
  
        productsCollection.find({})
        .toArray((error, documents) => {
    
          res.send(documents);
        });
    
    });










  
  
    // After Submit order User can see her order
    // app.get("/orderByUser/:email", (req, res) => {
  
    //   ordersCollection.find({ email: req.params.email })
    //   .toArray((error, documents) => {
  
    //     res.send(documents);
    //   });
  
    // });
  
  
  
    //update Order Status by specific order
    // app.patch("/updateSurviceById/:id", (req, res) => {
  
    //   ordersCollection.updateOne({ _id: ObjectId(req.params.id) },
    //     {
    //         $set: { status: req.body.status }
    //     }
    //   )
    //   .then(result => {
  
    //       res.send(result.modifiedCount > 0);
    //   });
  
    // });
  
  
  
    // After click service on homepage then get service name in Order form Api
    // app.get("/serviceById/:id", (req, res) => {
  
    //   servicesCollection.find({ _id: ObjectId(req.params.id) })
    //   .toArray((error, documents) => {
  
    //       res.send(documents[0]);
    //   });
  
    // });
  
  
  
    // Home page Show alll Service
    // app.get("/services", (req, res) => {
  
    //   servicesCollection.find({}).toArray((error, documents) => {
  
    //     res.send(documents);
    //   });
  
    // });
  
  
  
  
  
    //
    // app.get("/reviews", (req, res) => {
  
    //   reviewCollection.find({}).toArray((error, documents) => {
  
    //     res.send(documents);
    //   });
  
    // });
  
  
  
    /**********************************************************************************************************                                            Admin Section Used Api
    ***********************************************************************************************************/
    
  
  
    // add service for an admin
    // app.post("/addService", (req, res) => {
  
    //   const file = req.files.image;
    //   const title = req.body.title;
    //   const description = req.body.description;
  
    //   const newImg = file.data;
    //   const encodedImg = newImg.toString("base64");
  
    //   const image = {
  
    //     contentType: file.mimetype,
    //     size: file.size,
    //     img: Buffer.from(encodedImg, "base64")
  
    //   };
  
    //   servicesCollection.insertOne({ title, description, image })
    //   .then((result) => {
  
    //       res.send(result.insertedCount > 0);
    //   });
  
    // });
  
  
  
    // Orders list Show in Admin all Orders List
    // app.get("/allOrders", (req, res) => {
  
    //   ordersCollection.find({})
    //   .toArray((error, documents) => {
  
    //     res.send(documents);
    //   });
  
    // });
  
  
  
    //Make an Admin Api
    // app.post("/makeAdmin", (req, res) => {
  
    //   adminCollection.insertOne(req.body).then((result) => {
  
    //     res.send(result.insertedCount > 0);
    //   });
  
    // });
  
  
  
  
  
  
  
  
  
    // app.patch("/updateSurviceById/:id", (req, res) => {
  
    //   appointmentsCollection.updateOne({_id: ObjectId(req.params.id)}, {
    //     $set: {type: req.body.type}
    //   })
    //   .then(result => {
    //     res.send(result.modifiedCount > 0)
    //   })
  
    // })
  
  
  
  
  
    // app.get("/admin/:email", (req, res) => {
  
    //   adminCollection.find({ email: req.params.email })
    //   .toArray((error, documents) => {
  
    //       res.send(documents.length > 0);
    //     });
  
    // });
  
    
  
    console.log("Database Connected");
  });
  
  
  
  app.listen(process.env.PORT || port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  
















