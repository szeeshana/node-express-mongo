const express = require('express')
const User  = require('../models/user')
const router = new express.Router()

//********************************   Users End Points ***********************
router.post('/users' , async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users' , async (req,res)=> {
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/:id' , async (req,res)=> {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req,res) =>{
    const  updates = Object.keys(req.body)
    const allowedUpdateds = ['name','email','password','age']
    const isValidOpreation = updates.every((update)=> allowedUpdateds.includes(update))
    if(!isValidOpreation){
        return res.status(400).send({error: 'Invalid updates !'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body , { new: true, runValidators: true })
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req,res)=> {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)        
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router