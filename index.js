const express= require("express");
const jwt = require("jsonwebtoken");

const app=express();

app.get("/api", (req,res)=>{
    
    res.json({
        message:"Hey! welcome to Api service"
    })
})

app.post("/api/posts",verifyToken,(req,res)=>{
    jwt.verify(req.token, "secretkey",(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:"Post Created...",
                authData,
            });
        }
    });
    
});

app.post("/api/login",(req,res)=>{
    const user ={
        id:1,
        username:"John",
        email:"John@gmail.com"
    };

    jwt.sign({user:user},"secretkey",(err,token)=>{
        res.json({
            token,
        });
    });


});

function verifyToken(req,res,next){
    const bearerHeader =req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const beareToken = bearerHeader.split(" ")[1];
        req.token = beareToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000,(req,res)=>{
    console.log("The port is Running on 3000")
})
