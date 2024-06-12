import mongoose, { mongo } from "mongoose";
mongoose.connect("mongodb://localhost:27017/user-crud-ejs")

let userSchema = mongoose.Schema({
    name:String,
    email:String,
    image:String
})
let usermodel= mongoose.model("user",userSchema);
export default usermodel