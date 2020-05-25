const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Police = require('../models/Police');
router.get('/', (req, res) =>{
    Report.find({})
    .then(data =>{console.log(data);
                 res.json(data);})
    .catch(err => {console.log(err)});


});

router.get('/poli', (req, res) =>{
    Police.find({})
    .then(data =>{console.log(data);
                 res.json(data);})
    .catch(err => {console.log(err)});

   

});

router.get('/name', (req, res) =>{
    const data = {
        username: 'Anula',
        age: 5,
        LicenceNumber: '1234',
        userId: '1',
        ProofofOwnerShip: 'Filename',
        VIN: 'qerew',

    };
    res.json(data);

});

router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);

    const data = req.body;
    const newReport = new Report(data);

    newReport.save(err =>{
        if(err){
            res.status(500).json({msg: ' sorry Internal Server Error'});
            console.log('something went wrong');
        }
        else{
            res.json({msg: ' Your Data has been saved'});
        }
    });

});

router.post('/police', (req, res) =>{
    console.log('Body: ', req.body);
    const data = req.body;
    const {username, assigntask } = req.body;
    const newPolice = new Police({username, assigntask });

    Police.findOne({username}, (err, user)=>{
        console.log("From Police: ")
        console.log(user);
        console.log(err);
        if(err)
            res.status(500).json({message: {msgBody : "Error has Occured", msgError: true }});
        else if(user)
            res.status(400).json({message: {msgBody : "Username is already taken", msgError: true }});
        else{
            newPolice.save(err =>{
                if(err)
                 res.status(500).json({message: {msgBody : "Error has Occured", msgError: true }});
                else{
                    res.status(201).json({message: {msgBody : "Account Successfully Created", msgError: false }});
                } 
            });
        }        
    });

});

router.post('/update', (req, res) =>{
    console.log('Body: ', req.body);

    Police.findById(req.body._id, function(err, todo) {
        console.log(todo);
        if (!todo)
            res.status(404).send("data is not found");
        else{
            todo.username = req.body.username;
            todo.assigntask = req.body.assigntask;
           
            todo.save().then(todo => {
                res.json({msg: ' Your Data has been update'});

            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
  
 
});
module.exports = router;