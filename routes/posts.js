const express=require('express');
const router=express.Router();
const passport=require('passport');

const postController=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthenticated,postController.create);


module.exports=router;