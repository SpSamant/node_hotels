const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')



router.post('/',async(req,res)=>{
    try{
const data = req.body;
const newPerson = new Person(data);
const response = await newPerson.save();
console.log('data saved');
res.status(200).json(response)

    }catch(error){
console.log('error in saving data',error);
res.status(500).json({error:"Internal server error"})
    }
// const data = req.body // assuming the request body contains the person data

// create a new person document using the mongoose model

// const newPerson = new Person(data);
// newPerson.save((error,savedPerson)=>{
//     if(error){
//         console.log("error in saving person", error);
//         res.status(500).json({error:"Internal server error"})
//     }else{
//         console.log('data saved successfully');
//         res.status(200).json({savedPerson})
        
//     }

// })
// newPerson.name = data.name;
// newPerson.age = data.age;
// newPerson.email = data.email;
// newPerson.address = data.address

})

router.get('/', async(req,res)=>{
    try{
        const response = await Person.find();

        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log('error in saving data',err);
        res.status(500).json({error:"Internal server error"})
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType; // extract the worktype from the URL
    if(workType === 'chef' || workType === 'manager' || workType === 'waiter'){
        const response = await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response)
    }else{
        res.status(499).json({error:'Invalid work type'})
    }
    }catch(err){
console.log(err);
res.status(500).json({error:"Internal server error"})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const  personId = req.params.id;
        const updatedPersonData = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true,
        });
        if(!updatedPerson){
            return res.status(404).json({ error: 'Person not found'});
        }

    }catch(err){
        console.error('Error updating person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.delete('/:id', async(req,res)=>{
    try{
        const  personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({ error: 'Person not found'});
        }
        res.status(200).json({message:"person deleted successfully"})
    }catch(err){
        console.error('Error in deleting person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;