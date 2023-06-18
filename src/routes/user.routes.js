import express from 'express'
const router = express.Router();
import { getUsers, registerUser, updateUser, deleteUser, deleteAllUsers, login } from '../controllers/user.controller.js'
import { validateLogin, validateUpdateinfo, validateUserRegistration } from '../validators/user.validator.js'





router.post('/user/',validateUserRegistration,registerUser);
router.get('/user',getUsers);
router.put('/user/:id',validateUpdateinfo,updateUser);
router.delete('/user/:id',deleteUser);
router.delete('/user/',deleteAllUsers);
router.post('/login', validateLogin, login)




export default router;