const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/donation")
.then(() => {
    console.log("Connection successfull")
})
.catch((err) =>{
    console.log(`No Connection ${err}`)
})

const recordsch=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phonenum:{
        type:String,
        required:true,
        trim:true
    },
    myadd:{
        type:String, require:true, trim:true
    }

})

const user=mongoose.model("Records",recordsch);
const express=require('express')
const app = express();
const body1=require('body-parser');
const encoded=body1.urlencoded({extended:false})

app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/register.html');
})

app.post('/donation',encoded, async(req,res)=>{
    let data = new user({name: req.body.name, email:req.body.email, phonenum:req.body.phonenum, myadd: req.body.myadd})
    const result = await data.save();
    console.log(result);
    res.redirect('/list')
})


app.get('/list',async(req,resp)=>{
    let data=await user.find();
    resp.send(data);
})  

app.listen(3000,()=>{
    console.log("Running")
})