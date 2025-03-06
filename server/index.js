import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import {PrismaClient} from "@prisma/client";
const prisma=new PrismaClient();

dotenv.config();
const app=express();
app.use(cors());
const PORT=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("/register",async(req,res)=>{
   const{name,email,phone,birthdate,message} =req.body;

   if(!name || !email || !phone || !birthdate || !message){
    return res.status(400).json({error:"Some data not inserted"})
   }
   try{
    const response=await prisma.user.create({
        data:{
            name:name,
            email:email,
            phone:phone,
            birthdate:birthdate,
            message:message
        }
    })
     res.status(200).json({message:"User Registered successfully"});
   }catch(error){
    console.log(error);
   }


})

app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`);
})