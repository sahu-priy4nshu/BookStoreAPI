const express=require('express')
const Book=require('../models/books')
const auth=require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth');
const bookSchema = require('../middleware/npm-joi');
const router=new express.Router();


router.get('/books',auth,async (req,res)=>{
    try{
        const books=await Book.find()
        res.status(200).send(books)
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/books',adminAuth,async (req,res)=>{
    const book=new Book(req.body)
    const { error,value } = bookSchema.validate(req.body)
    try{
        await book.save()
        res.status(200).send({message:"Book Added Successfully",book})
    }catch(e){
        res.status(404).send(e.message)
    }
})

router.get('/books/:id',auth,async (req,res)=>{
    const _id=req.params.id
    try{
        const book= await Book.findById(_id)
        res.status(200).send(book)
    }catch(e){
        res.status(404).send(e)
    }
})

router.put('/books/:id',adminAuth,async(req,res)=>{
    const _id=req.params.id
    try{
        const book= await Book.findByIdAndUpdate(_id,req.body)
        res.status(200).send({message:"Book Updated Successfully"})
    }catch(e){
        res.status(404).send(e)
    }
})

router.delete('/books/:id',adminAuth,async(req,res)=>{
    const _id=req.params.id
    try{
        const book= await Book.findByIdAndDelete(_id)
        res.status(200).send({message:"Book Deleted Successfully",book})
    }catch(e){
        res.status(404).send(e)
    }
})


module.exports=router;