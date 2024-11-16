const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotEnv = require("dotenv");
const dataRouter = require("./routes/data.js");
const userRouter = require("./routes/user.js");

dotEnv.config();

mongoose.connect('mongodb://localhost:27017/StarGaze').then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
});

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/data", dataRouter);
app.use("/api/user", userRouter);

app.listen(3000 , ()=>{
    console.log("server is listning on port 3000");
});
