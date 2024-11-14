const express = require('express');
const app = express();
const ConnectDb = require('./Module/database');
const todolist = require("./Views/TodoRoutes");
require('dotenv').config();

const cors = require('cors');

ConnectDb();
app.use(cors()); //frontend and backend part connect.
app.use(express.json()); //middleware connect between view to controller

app.use("/todo",todolist);


const PORT = process.env.PORT || 3000;//port running this

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})