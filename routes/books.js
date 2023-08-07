const express=require('express')
const Book=require('../models/books')
const auth=require('../middleware/auth')
const logger=require('../logger')
const adminAuth = require('../middleware/adminAuth');
const validators = require('../middleware/npm-joi');
const router=new express.Router();
const axios = require('axios');
const sentry = require('@sentry/node')

sentry.init({
    dsn: "https://3b55aafdc6804d0b948ae2478917bccb@o201295.ingest.sentry.io/4505602112356352",
    tracesSampleRate: 1.0,
    serverName: "Priyanshu_BookStore"
})

router.use(sentry.Handlers.requestHandler());
router.use(sentry.Handlers.errorHandler());

// router.get('/homepage', (req, res)=>{
//     res.sendFile('/Users/priyanshu.sahu/Downloads/BookStoreAPI/frontend/index.html')
// })

router.get('/books',auth,async (req,res)=>{
    try{
        const books=await Book.find()
        res.status(200).send(books)
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/newbook',adminAuth,async (req,res)=>{
    const book=new Book(req.body)
    const { error,value } = validators.bookSchema.validate(req.body)
    if(error)
    {
        return res.status(400).json({error: error.details[0].message})
    }
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

router.get('/books/buy/:id',auth,async(req,res) => {
   try{ 
        logger.info(`User ${req.body.email} is attempting to buy book ${req.params.id}.`)
                const _id = req.params.id
                const bookData = await Book.findById(_id)
                if(!bookData)
                {
                    throw new Error("Book not available")
                
                }
                
                if(!bookData.stock)
                {
                    throw new Error("Stock not available")
                }
                bookData.stock = bookData.stock-1;


                async function sendData() {
                        const url = 'https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process'; // Replace with the API endpoint URL
                        const dataToSend = {
                            "card_number": req.body.card_number,
                            "cvv": req.body.cvv,
                            "expiry": req.body.expiry,
                            "currency": req.body.currency,
                            "amount": req.body.amount
                            };
                    try {
                        const response = await axios.post(url, dataToSend).catch((error) =>{
                            throw error
                        })
                        const responseData = response.data;
                        console.log(responseData)
                        await bookData.save()
                        // Process the response data as needed
                        res.status(200).send(responseData)
                    } catch (error) {
                        sentry.captureException(error)
                        res.status(404).send("Something Went Wrong During the Payment.")
                        logger.info("Something Went Wrong During the Payment.")

                    }
            }

            sendData();

}
catch (e){
    res.status(404).send({e : e.message})
    sentry.captureException(e)
}

})


module.exports=router;