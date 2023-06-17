import mongoose from "mongoose";
export const  validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
 
 /***
  * @param status
  * @param message
  * @param data
  * @returns {{data: *, message: string, status: number}}
  */

export const formartResult =(status=200, message="ok",data) =>{
    return {
        status:status,
        message:message,
        data:data
    }
}