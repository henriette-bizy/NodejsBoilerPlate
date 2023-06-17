const mongoose = require('mongoose')
const {schema} = mongoose


const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        default:null,
        
    },
    productManufacturer:{
        type:String,
        default:null,
    },
    productPrice:{
        type:String,
        default:null
    },
    
},{timestamps:true})



module.exports = mongoose.model('Product',productSchema);