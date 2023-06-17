import jwt from "jsonwebtoken";
import { formartResult } from "../utils/formatResult";

const { verify } = jwt;
export const checkAuthorization = (req, res, next) =>{
    const token = req.header("Authorization").trim();
    if(!token) return res.send(formartResult({status:400, message:"You have to log in first", data:error.message}))
    try {
        const tokenArray = token.split(" ");
        let user = verify(tokenArray[1], (process.env.KEY))
        console.log("User", user)
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid Token", error: error.message})
    }
}