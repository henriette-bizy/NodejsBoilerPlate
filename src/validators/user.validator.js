import joi from 'joi';
import {User} from '../models/user.model.js'
import { formartResult } from '../utils/formatResult.js';
import {validateObjectId} from '../utils/formatResult.js'
import { genSalt, compare,hash  } from 'bcrypt';





export const validateUserRegistration = async(req,res,next)=>{

    try{

    const {body} = req
    const userValidator = joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),
        role:joi.string().default('Admin').valid('admin','user').required(),
        picture:joi.string()
    })


    const {error} = userValidator.validate(body);

    if(error){
         return res.status(401).json({
            error:error.message,
            message:"Unable to create account"
         })
    }

    //checking the existing email

    const  existingEmail = await User.findOne({email:body.email})
    if(existingEmail){
       return res.status(401).json({
            message:"User with that email already exists"
        })
    }


    return next()

    }catch(error){
    return res.status(401).json({
        error:error.message
    })
}
}


export const validateUpdateinfo = async(req,res,next) =>{

try{

    let { id } = req.params;
    const body = req.body;

    
    const userValidator = joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),
        role:joi.string().default('admin').valid('admin','user').required(),
        picture:joi.string()
    })


    const {error} = userValidator.validate(body);

    if(error){
         return res.status(401).json({
            error:error.message,
            message:"Unable to create account"
         })
    }


    const {err} = validateObjectId(id);
    if(err) return res.send(formartResult({status:204, message:"Invalid id ", data:err}))

    //finding the user
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.send(formartResult({ status: 404, message: "user not found" }));
    }

    const duplicateEmail = await User.findOne({
      _id: {
        $ne: req.params.id,
      },
      userEmail: req.body.userEmail,
    });


    
    if (duplicateEmail)
      return res.send(
        formartResult({
          status: 400,
          message: "user with this email already exists",
        })
      );

      return next()

}catch(error){

    res.send(formartResult({status:400, message:"terminated",data:error.message}))
}
}


//validateLogin

export const validateLogin = (req, res, next) =>{
    try {
        const {body} = req;
    const loginValidator = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const {error} = loginValidator.validate(body)
    if(error){
        res.status(400).json({
            error: error.message,
            message: "Login Failed"
        })
    }
    } catch (error) {
        res.send(formartResult({status:400, message:error, data:error.message}))
    }
    return next();
}