const express= require("express")
const app = express();
const body1=require('body-parser');
const user = require("./connect");
const encoded=body1.urlencoded({extended:false})
app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})
app.post('/signup',encoded,async (req,res)=>{
    let user1 = await user(req.body);
    user1.save()
        .then(() => {
            res.send(`
            <h2>User registered successfully!</h2>
            <p>Click <a href="/login">here</a> to login or click <a href="/">here</a> to register another user.</p>
        `);
        })
        .catch(err => console.log(err))
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})
app.post('/loggedin', encoded, async (req,res)=>{
    const username1=req.body.username;
    const password1 = req.body.password;
    user.findOne({ username:username1, password:password1 })
        .then(user1 => {
            if (user1) {
                res.redirect('/dashboard');
            } else {
                res.send(`
                <p> Invalid Username or Password! Go back to <a href="/login"> Login </a>page or <a href="/">Click here</a> to register again.</p>
                `);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})
app.get('/dashboard', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
    console.log('Welcome!')
})
app.listen(8080, ()=>{
    console.log("Server is rumming on port 8080")
})