import mongoose from 'mongoose'
const {connect} = mongoose;
import {config} from 'dotenv'

config({path:'./.env'})



function connectDatabase() {
  connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>console.log("connected to database"))
  .catch(err=>console.log(err))
}


export default connectDatabase;