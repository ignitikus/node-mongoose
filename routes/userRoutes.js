const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const mongoose = require('mongoose')

const {
   register, 
   login, 
   updateProfile, 
   deleteProfile
   } = require('../controllers/userController')



router.get('/', (req,res) => {
   User.find({}).then(users => res.status(200).json(users))
   })
router.post('/register', register)
router.post('/login', login)
router.put('/update/:id', updateProfile)
router.delete('/delete/:id',deleteProfile)

module.exports = router