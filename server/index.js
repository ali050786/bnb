const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require("./config/dev");
const FakeDB = require("./fakedb");
const Rentals = require("./model/rental");
const rentalRoutes = require('./routes/rental'); 
const userRoutes = require('./routes/users');


mongoose.connect(config.DBURI,{ useNewUrlParser: true }).then(()=>{
    const fakedb = new FakeDB();
    fakedb.seedDb();
});


const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
//




app.listen(PORT, function(){
    console.log("Your Server has been initiated on port: " + PORT)
})