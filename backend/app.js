const express = require("express");
const app = express();
const PORT = 5000;
const data = require("./data")
const mongoose = require("mongoose")
app.use(express.json())
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

require("./Patient panel/routes/models/patlog")
app.use(express.json())


app.use(require("./Patient panel/routes/auth"))
app.use(require("./Admin_panel/main"))
app.use(require("./Doctor panel/login"))

mongoose.connect("mongodb+srv://tadhms:asII2XSaNxbI8xG6@cluster0.g2sphkg.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })


mongoose.connection.on("connected",()=>{
    console.log("mongodb sucessfully connected")
})

mongoose.connection.on("error",()=>{
    console.log("mongodb is not successfully connected")
})

app.get('/',(req,res)=>{
    res.json("hello world")
})



app.listen(PORT,()=>{
    console.log("server is running on port"+PORT)
})