const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');



router.get('/profile',userController.profile);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);


router.post('/create',userController.create);
router.get('/createSession',userController.createSession);




module.exports=router;