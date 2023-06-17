import mongoose from 'mongoose';
import dotenv from 'dotenv';
const {Schema} = mongoose
import paginate from 'mongoose-paginate-v2'
import jwt from 'jsonwebtoken'
const {sign} = jwt;
dotenv.config();




const userSchema = new mongoose.Schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        
      },
      password: {
        type: String,
        required: true
      },
      role:{
        type: String,
        default:'admin',
        enum:['admin','member','client']
      },
      picture:{
        type:String,
        default:null
      }
},{timestamps:true});



//paginate plugged in
userSchema.plugin(paginate);



userSchema.methods.generateAuthToken = function(){
  const token = sign(
      {_id: this._id,
      email:this.email},
      process.env.KEY
  )
  return "Bearer "+ token;
}


export const User = mongoose.model("User", userSchema);



