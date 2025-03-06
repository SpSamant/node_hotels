const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async(req,res)=>{
    try{
       const data = req.body;
       const menuItem = new MenuItem(data);
       const response = await menuItem.save();
       console.log('data saved');
       res.status(200).json(response)
    }catch(err){
   
       console.log('error in saving data',err);
       res.status(500).json({error:"Internal server error"})
    }
   
   })

   router.get('/', async(req,res)=>{
    try{
        const response = await MenuItem.find();

        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log('error in saving data',err);
        res.status(500).json({error:"Internal server error"})
    }
})
router.get('/:taste', async(req,res)=>{
    try{
        const tasteType = req.params.taste; // extract the worktype from the URL
    if(tasteType === 'Sweet' || tasteType === 'Spicy' || tasteType === 'Sour'){
        const response = await MenuItem.find({taste:tasteType});
        console.log('response fetched');
        res.status(200).json(response)
    }else{
        res.status(499).json({error:'Invalid taste type'})
    }
    }catch(err){
console.log(err);
res.status(500).json({error:"Internal server error"})
    }
})

router.put('/:id', async(req,res)=>{
    try{
const menuId = req.params.id;
const updatedMenuData = req.body;
const updatedMenu = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
    new: true,
    runValidators:true,
})
if(!updatedMenu){
    res.status(400).json({error:'Menu not found'})
}
res.status(200).json({message:"Menu updated"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})  
    }
})

router.delete('/:id', async(req,res)=>{
    try{
const  menuId = req.params.id;
const updatedMenu = await MenuItem.findByIdAndDelete(menuId);
if(!updatedMenu){
    res.status(400).json({error:"Menu not dfound"})
}
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})  
    }
})

module.exports = router;