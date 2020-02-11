const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

module.exports = {
   register: (req,res) => {
      return new Promise((resolve,reject) => {
         const { name, email, password } = req.body
         //* validate input *//
         if(name.length===0||email.length===0||password.length===0) {
            return res.json({message:'All fields must be completed'})
         } 

         User.findOne({email:req.body.email}).then(user=>{
            if(user){
               return res.status(403).json({message: 'User already exists'})
            }
            const newUser = new User()
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            newUser.name = name
            newUser.email = email
            newUser.password = hash

            newUser.save().then((user) => {
               return res.status(200)
               .json({message: 'User created', user})
               .catch(err=>reject(err))
            })
         }).catch(err=>reject(err))
         resolve(user)
      })
   },

   login: (req,res)=>{
      return new Promise((resolve,reject)=>{
         User.findOne({email: req.body.email}).then(user=>{
            bcrypt.compare(req.body.password, user.password)
            .then(user=>{
               return res.send(user?'You are now logged in':'Incorrect credentials')
            })
         }).catch(err=>res.status(500).json({message:'Server error',err}))
      }).catch(err=>reject(err))
   },

   updateProfile: (req,res) => {
      return new Promise((resolve, reject)=>{
         User.findById({_id: req.params.id}).then((user) => {
            const {name, email} = req.body
            user.name = name ? name :user.name
            user.email = email ? email :user.email

            user.save().then((user) => {
               return res.status(200).json({message: `User updated:`,user})
            }).catch(err => reject(err))
         }).catch(err=>res.status(500).json({message: `Server error`}))
      })
   },

   deleteProfile: (req,res) => {
      try{
         return new Promise((resolve,reject) => {
            User.findByIdAndDelete({_id: req.params.id}).then((user) => {
               res.status(200).json({message: `User deleted`, user})
            }).catch(err=> res.status(400).json({message: `No user to delete`}))
         })
      }catch(error) {res.status(500).json({message:'Server error'})}
   }
}