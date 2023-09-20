const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');
const passport=require('passport');



router.get('/profile',userController.profile);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);


router.post('/create',userController.create);

router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
)
,userController.createSession);




module.exports=router;