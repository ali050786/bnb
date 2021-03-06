const express = require('express');
const router = express.Router();
const Rental = require('../model/rental');

const UserCtrl = require('../controllers/users');

router.get('/secret',UserCtrl.authMiddleware, function(req, res){
    res.json({"secret":true});
});

router.get('', function(req,res){
    Rental.find({},function(err, foundRentals){
        res.json(foundRentals);
    })
})

router.get('/:id', function(req,res){
    const rentalId = req.params.id;
    Rental.findById(rentalId,function(err, foundRentals){
        if (err){
            res.status(422).send({errors:[{title:'Rental Errors', details:"Could not find Rental"}]})
        }
        res.json(foundRentals);
    })
})

module.exports = router;