const express=require('express');
const User=require('../models/users')
const router= new express.Router()
const validators=require('../middleware/npm-joi')

router.post('/auth/register',async(req,res)=>{
    const { error,value } = validators.registerSchema.validate(req.body)
    // if(error)
    // {
    //     return res.status(400).json({error: error.details[0].message})
    // }
    try{
        const user= new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        res.status(200).send({message:"User Registered Successfully",user,token})
    }catch(e){
        res.status(404).send(e.message)
    }
})

router.post('/auth/login', async (req, res) => {
    const { error,value } = validators.loginSchema.validate(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({message:"User Login Successfully", user, token })
    } catch (e) {
        res.status(404).send(e.message)
    }
})

module.exports=router;