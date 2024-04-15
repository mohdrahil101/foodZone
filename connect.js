const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/website")
.then(() => {
    console.log("Connection successfull!")
})
.catch((err) =>{
    console.log(`No Connection ${err}`)
})
const signupsch=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true 
    }

})
const user=mongoose.model("Register",signupsch);
module.exports=user;