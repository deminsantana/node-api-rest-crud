const UserModel = require('../models/user.model')
// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const Joi = require('@hapi/joi')

// 
router.post('/register', async (req, res) => {
    res.json({
        error: null,
        data: 'Acabas de enviarme las credenciales de un usuario'
    })
})

// Creamos un esquema de registro usando las validaciones de Joi 
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async (req, res) => {

    // Dentro del método que invoca POST 
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    const { error } = schemaRegister.validate(req.body)

    // Si este error existe, aqui se termina la ejecución devolviedonos el error
    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    // Otras validaciones
    // Verificar si el email es único
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    // Hash y la contraseña
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

})

// Create a new user
// POST localhost:3000/user
router.post('/user', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }

    if(!req.body.email) {
        // ...
    }

    // let user = {
    //    name: 'firstname lastname',
    //    email: 'email@gmail.com'
    //}

    let model = new UserModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET
router.get('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Falta el parámetro URL: email')
    }
    
    UserModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// UPDATE
router.put('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Falta el parámetro URL: email')
    }
    
    UserModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// DELETE
router.delete('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Falta el parámetro URL: email')
    }
    
    UserModel.findOneAndUpdate({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router