const express=require('express');
const router=express.Router();

router.use('/v1',require('./v1'));
router.use('/v2',require('./V2'));

module.exports=router;