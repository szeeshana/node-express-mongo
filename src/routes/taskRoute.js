const express = require('express')
const Task  = require('../models/task')
const router = new express.Router()

// ************************************ Task End Points ********************
router.post('/tasks' , async (req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req,res)=>{
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

router.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdateds = ['description','completed']
    const isValidOpreation = updates.every((update)=> allowedUpdateds.includes(update) )

    if(!isValidOpreation){
        res.status(400).send({error: 'Invalid update !'})
    }

    try {
        const task =  await Task.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/tasks/:id', async (req,res)=> {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)        
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router