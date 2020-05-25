//Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReportSchema = new Schema({
    username:{
        type: String,
        required: true,
       
    },
 
    age:{
        type: Number,
        required: true
    },
    LicenceNumber: {
        type: String,
        required: true, 
    },
   
    UserID:{
        type: String,
        required: true
    },
    ProofofOwnerShip: {
        type: String,
        required: true, 
    },
    VIN: {
        type: String,
        required: true, 
    },
    status: {
        type: Boolean,
        required: true, 
    },

});

//Model
const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;