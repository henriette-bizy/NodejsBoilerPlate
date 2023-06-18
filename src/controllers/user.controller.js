import {User} from "../models/user.model.js";
import { compare, genSalt, hash } from "bcrypt";
import _ from 'lodash';
import { formartResult } from "../utils/formatResult.js";
import {validateObjectId} from "../utils/formatResult.js"
const pick = _.pick

//registerUser
export const registerUser = async (req, res) => {
  try {
    const newUser = new User(
      pick(req.body, ["firstName","lastName", "email", "role", "picture", "password"])
    );

    const salt = await genSalt(10);
    newUser.password = await hash(newUser.password, salt);
    await newUser.save();

    return res.send(formartResult({status:200, message:"user created succesffulyy", data:newUser}))
  } catch (error) {
   return res.status(400).json({
      error: error,
      message: error.message,
    });
  };
  }



//getUsers

export const getUsers = async(req,res)=>{

try{


  let{limit,page} = req.query;
  if(!page) page=1;
  if(!limit) limit = 10;

  if(page<1){
    return res.send(formartResult({status:200,message:"page query must be greater than 0"}));
  }


  const options = {
    page:page,
    limit:limit
  }


  const users = await User.paginate({},options);
  // res.send(formartResult({status:200, message:"retrieved all users successfully",users}));
  res.status(200).json({
    success:true,
    users
  })

}catch(error){
  return res.status(400).json({
    message:"it can't work",
    error:error

  })
}

}

//updating user

export const updateUser = async(req,res)=>{


  try{

    let { id } = req.params;
    const body = req.body;

   

    const updatedUser = await User.findOneAndUpdate({ _id: id }, body);

    return res.send(
      formartResult({
        status: 201,
        message: "User updated successfully",
        data: updatedUser,
      })
    );
  } catch (error) {
    res.send(
      formartResult({ status: 400, message: "bad request", data: error })
    );
  }
}



//deleting a user
export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) return res.send("user not found").status(404);

    return res.send(
      formartResult({
        status: 200,
        message: "user deleted succesffuly",
        data: user,
      })
    );
  } catch (error) {
    res.send(formartResult({ status: 400, message: error }));
  }
};

//deleting all users
export const deleteAllUsers = async (req, res) => {
  const users = await User.deleteMany();
  if (!users) {
    res.send(
      formartResult({
        status: 400,
        message: "Bad request",
      })
    );
  }

  res.send(
    formartResult({
      status: 200,
      message: "Deleted the whole thingy",
      data: users,
    })
  );
  }



  //loggin in
  export const login = async(req,res)=>{
    try{
      let {body} = req;
        let user = await User.findOne({email: body.email});
        if (!user){
            res.send(formartResult({status:404,message:"user doesn't exist"}))
        }
        
        let comparePassword = await compare(body.password,user.password);
        if(!comparePassword) return res.send(formartResult({status:400, message:"Invalid email or password"}))

        const token = user.generateAuthToken()
        res.header("Authorization", token).status(200).json({
            message: "Logged in Successfully",
            token, 
            data: user
        })
    } catch (error) {
        res.send(formartResult({status:400, message:error, data:error.message}))
    }
}