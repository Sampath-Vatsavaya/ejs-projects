import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import.meta.dirname
import user from "./models/user.js"
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);


const app = express()
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/public")))
app.get("/",(req,res)=>{
    res.render("index") 
})
app.post("/create",async  (req,res)=>{
    console.log(req.body)
    let Createduser =await user.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
    })
    res.redirect("/")

})
app.get("/read", async(req,res)=>{
    let users= await user.find();
    res.render("user",{users:users})
})
app.get("/update/:id", async (req,res)=>{
    let currentUser= await user.findOne({_id: req.params.id});
    res.render("update",{user:currentUser})
})
app.get("/delete/:id",async (req,res)=>{
    let deletedUser= await user.deleteOne({_id: req.params.id})
    console.log(deletedUser)
    res.redirect("/read")

})

app.post("/update/:id",async (req,res)=>{
    const {name,email,image}=req.body
   let updatedUser= await user.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true})
   res.redirect("/read");
})


app.listen(3000,()=>{console.log("Site is up and running")})