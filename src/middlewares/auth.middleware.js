import jwt from "jsonwebtoken";
import { formartResult } from "../utils/formatResult";
import { User } from "../models/user.model";

const { verify } = jwt;
export const checkAuthorization = async (req, res, next) =>{
    const token = req.header("Authorization").trim();
    if(!token) return res.send(formartResult({status:400, message:"You have to log in first", data:error.message}))
    try {
        const tokenArray = token.split(" ");
        let user = verify(tokenArray[1], (process.env.KEY))
        
        console.log("User", user)

        // const fethedUser = await User.findOne(user?.id);

        req.user = user;
        // req.role = fethedUser.role;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid Token", error: error.message})
    }
}