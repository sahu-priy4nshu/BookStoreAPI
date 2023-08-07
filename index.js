const express=require('express');
require('./db/mongoose')
const userRouter=require('./routes/users')
const bookRouter=require('./routes/books')


const app=express();
const port= 3000

const path = "/Users/priyanshu.sahu/Downloads/BookStoreAPI/frontend"

app.use(express.static(path));

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)




app.listen(port,()=>{
    console.log('Server is up on port: '+ port)
})