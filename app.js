const http = require('http');
const express = require('express');
const app = express();
const Slots = require('./models/slots');
const SlotUsers = require('./models/meetUsers');
var cors  = require('cors');
const Sequelize = require('sequelize');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());

app.post('/add-users', async(req,res,next)=>{
    try{
        if(!req.body.name){
            throw new Error('name required')
        }
        if(!req.body.email){
            throw new Error('email required')
        }
        
        const name = req.body.name;
        const email = req.body.email;
        const time = req.body.time;
        const link = req.body.link;
        const userdata = await SlotUsers.create({
            name : name,
            email : email,  
        })

        const slotData = await Slots.create({
            time : time,
            link : link,
            SlotUserId : userdata.id
        }) 
       

        res.status(201).json({userDetails : userdata, slotDetails : slotData})

        

    }catch(error){
        res.status(500).json({error : error.message})
    }
})



Slots.belongsTo(SlotUsers,{constraints: true, onDelete: 'CASCADE'}) //ondelete : cascade means when we del user, slot will also be gone

sequelize.sync()
    .then(user =>{
        //console.log(user);
        app.listen(4000);
        console.log('server is running')

    })
    .catch(err => console.log(err));
