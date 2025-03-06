import {useState} from "react";
import axios from "axios";
import API_URL from "../utils/consants.jsx";
import {ToastContainer,toast} from "react-toastify";
import { ClipLoader} from "react-spinners";
export default function Form(){

    const[data,setData]=useState({
      name:"",
      email:"",
      phone:"",
      birthdate:"",
      message:""
    });
    const[loading,setLoading]=useState(false);

    function handleChange(e){
     const{name,value}=e.target;

     setData((prev)=>{
             return{
                ...prev,
                [name]:value,
             }
     })
    }

   async function handleClick(){
    setLoading(true);
    try{
      const response=await axios.post(`${API_URL}/register`,data);
       console.log(response);
       toast.success("User Registered Successfully");
    }catch(error){
      console.log(error);
      toast.error("User cannot be registered");
    }finally{
      setLoading(false);
      setData({
        name:"",
        email:"",
        phone:"",
        birthdate:"",
        message:""
      })
    }
    }
    return(
        <div className="form">
          <ToastContainer/>
           <h2>Register</h2>
            <label for="name">Enter Name:</label>
            <input className="input-box" type="text" name="name" value={data.name} placeholder="Enter Your Name" onChange={handleChange} required/>
            <label for="email">Enter Email:</label>
            <input className="input-box" type="text" name="email" value={data.email} placeholder="Enter Your Email" onChange={handleChange} required/>
            <label for="phone">Enter Phone:</label>
            <input className="input-box" type="text" name="phone" value={data.phone} placeholder="Enter Your Number" onChange={handleChange} required/>
            <label for="birth">Enter Birthdate:</label>
            <input className="input-box" type="text" name="birthdate" value={data.birthdate} placeholder="Enter Your Birthdate" onChange={handleChange} required/>
            <label for="msg">Enter Message:</label>
            <input className="input-box" type="text" name="message" value={data.message} placeholder="Enter Your Message" onChange={handleChange} required/>
            <button className="btn" type="button" onClick={handleClick}>
              {loading ? < ClipLoader height="20" width="20" color="black"/>:"Submit"}</button>
        </div>
    )
}