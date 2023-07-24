const Joi = require('joi')
const validators={
registerSchema: Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(7).required(),

    name: Joi.string().min(1).required(),

    role:  Joi.string()

}),
loginSchema: Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(4).required(),

    role:  Joi.string()

}),
bookSchema: Joi.object({

    title: Joi.string().required(),

    author: Joi.string().required(),

    price: Joi.number().required(),

    stock: Joi.number().required(),

    genre: Joi.string().required()

})
}
module.exports=validators