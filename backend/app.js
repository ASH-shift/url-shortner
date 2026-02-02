import express from "express";
const app=express();
import {nanoid} from "nanoid";  
    
app.get("/api/create",(req,res)=>{
    res.send(nanoid(7));
})

app.listen(3000,()=>{
    console.log("server is running on port http://localhost:3000");
})