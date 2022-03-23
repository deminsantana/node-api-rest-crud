let UserDetailModel = require('../models/userdetail.model')
let express = require('express')
let router = express.Router()

// Create a new user
// POST localhost:3000/userdetail
router.post('/userdetail', (req, res) => {
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

    let model = new UserDetailModel(req.body)
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
router.get('/userdetail', (req, res) => {
    if(!req.query.status) {
        return res.status(400).send('Missing URL parameter: status')
    }
    
    UserDetailModel.findOne({
        status: req.query.status
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// UPDATE
router.put('/userdetail', (req, res) => {
    if(!req.query.status) {
        return res.status(400).send('Missing URL parameter: status')
    }
    
    UserDetailModel.findOneAndUpdate({
        status: req.query.status
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
router.delete('/userdetail', (req, res) => {
    if(!req.query.status) {
        return res.status(400).send('Missing URL parameter: status')
    }
    
    UserDetailModel.findOneAndUpdate({
        status: req.query.status
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router