// // console.log("server started");
// const notes = require("./notes.js");
// const lodash = require('lodash');
// const fs = require('fs');
// console.log("server file is available");
// let age = notes.age;
// let result = notes.addNumber(age,10)
// console.log(age);
// console.log('result is now ',result);
// let data = ["person",'person',1,2,1,3,2,3,'name','age']
// let uniqueData = lodash.uniq(data);
// console.log(uniqueData);
// console.log(lodash.isString('Prava'));
// let area = notes.calculateCircleArea(5);
// let oddEvenNums = [2,4,5,8,4,1,6,7,9,2];
// console.log("area of the circle is:", area);
// console.log("addition of two numbers :",notes.performOperation(2,3,notes.add));
// console.log("subtraction of two numbers :",notes.performOperation(3,3,notes.sub));
// console.log("multiplication of two numbers :",notes.performOperation(2,3,notes.mul));
// console.log("div of two numbers :",notes.performOperation(4,2,notes.div));

// console.log("sum of all even numbers in the array:",lodash.sumBy(oddEvenNums)); // sumby will add all the numbers in the array

const express = require('express');
const db = require('./db')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());  //req.body
// const Person = require('./models/Person');
// const MenuItem = require('./models/MenuItem');
const Task = require('./models/Task')
const PORT = process.env.PORT || 3000;
app.get('/',(req,res)=>{res.send("Welcome to my hotel! How can I help you");
})

// post route toadd a person





app.post('/api/task', async(req,res)=>{
    try{
       const data = req.body;
       const task = new Task(data);
       const response = await task.save();
       console.log('data saved');
       res.status(201).send(response)
    }catch(err){
   
       console.log('error in saving data',err);
       res.status(500).json({error:"Internal server error"})
    }
   
   })

   app.get('/api/task', async(req,res)=>{
    try{
        const response = await Task.find();

        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log('error in saving data',err);
        res.status(500).json({error:"Internal server error"})
    }
})
// get person data


// app.get('/chicken',(req,res)=>{res.send("Sure Sir, I would love to serve chicken");
// })
// app.get('/idli',(req,res)=>{
//     let customized_idli={
//         name:"Idli",
//         size: "10cm",
//         is_sambar: true

//     }
//     // res.send("Welcome to south india");
//     res.send(customized_idli);
//     // res.send('Idli');
// })
// app.get('/currentWeather',(req,res)=>{
//     let currentWeather={
//         temperature:"30c",
//         conditions: "mostly sunny",
//         city: "Bengaluru"
//     }
//    // res.send("Welcome to south india");
//     res.json(currentWeather);
// })

// app.post('/items',(req,res)=>{
//     res.send('data is saved')
// })

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu',menuItemRoutes);

app.listen(PORT,()=>{console.log("listenting on port 3000");
})







