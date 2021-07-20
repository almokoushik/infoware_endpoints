const express=require("express")
const app=express()
const { MongoClient } = require('mongodb');
app.use(express())
app.use(express.json())

const uri = "mongodb+srv://almo3:almoalmoalmo@cluster0.kar2i.mongodb.net/infoware?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


try{
    client.connect(err => {
        //collection for admin
        const admins = client.db("infoware").collection("admin");
         //collection for orders
        const orders = client.db("infoware").collection("orders");
         //collection for products
        const products = client.db("infoware").collection("products");
         //collection for user
        const users = client.db("infoware").collection("user");

        console.log("COnnected.....")

        if (err) {
            console.log("Error", err)
            return
        }

       //Add admin Account
       app.post("/addAdminAccount",(req,res)=>{
           const adminData=req.body
          try{
              admins.insertOne(adminData).
                  then(result => {
                    //   console.log(result)
                      result.insertedId && res.send(result.insertedId)
                  })
          }
          catch(err){
            //   console.log(err)
              res.send(err)
          }

       })
        //Add a product
        app.post("/addProduct", (req, res) => {
            const productData = req.body
            try {
                products.insertOne(productData).
                    then(result => {
                        //   console.log(result)
                        result.insertedId && res.send(result.insertedId)
                    })
            }
            catch (err) {
                //   console.log(err)
                res.send(err)
            }
        })
        //FInd All orders
        app.get("/allOrders", (req, res) => {
      
                try{
                    products.find({}).toArray()
                        .then(result => {
                            res.send(result)
                        })
                        .catch(err => console.log(err))
                }
                catch(err){
                    console.log(err)
                }
            })
        //Add a user Account
        app.post("/addUserAccount", (req, res) => {
           const userData=req.body
           try{
               users.insertOne(userData)
               .then(result=>{
                   result.insertedId&&res.send(result.insertedId)
                   
               })
               .catch(err=>console.log(err))

           }
           catch(err){
               console.log(err)
           }
        })
        //Login a User
        app.post("/login", (req, res) => {
            const loginData=req.body
          try{
              users.find({"email":loginData.email}).toArray()
              .then(response=>console.log(response))
              .catch(err=>console.log(err))
              
          }
          catch(err){
              console.log(err)
          }
        })
        //Find all products
        app.get("/allProducts", (req, res) => {
            try{
                products.find({}).toArray()
                .then(response=>res.send(response))
                .catch(err=>console.log(err))

            }
            catch(err){
                console.log(err)
            }
        })
        //Place an order
        app.post("/placeOrder", (req, res) => {
            const orderData=req.body
            try{
                orders.insertOne(orderData)
                .then(response=>{
                    response.insertedId&& res.send(response.insertedId)
                })
                .catch(err=>console.log(err))

            }
            catch(err){
                console.log(err)
            }
        })
        //Find products ordered by a specific person
        app.get("/orderedProducts/:email", (req, res) => {
            const emailData=req.params
           try{
              products.find(emailData).toArray()
              .then(response=>console.log(response))
              .catch(err=>console.log(err))

           }
           catch(err){
               console.log(err)
           }
        })

       
    });
}
catch(err){
    console.log(err)
}


app.listen(3000,()=>console.log("Listening to port 3000..."))