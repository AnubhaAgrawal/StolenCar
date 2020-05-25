const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoliceSchema  = new Schema({
    username:{
        type: String,
        required: true,
       
    },
    assigntask:{
        type:Boolean,
        default: false
    }
});

const Police = mongoose.model('Police',PoliceSchema);

module.exports = Police;