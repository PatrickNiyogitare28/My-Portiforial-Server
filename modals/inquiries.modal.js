const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    email: 
       { type: String,
        requried: true
    },
    
    date: {
        type: String,
        required: true,
    },
    inquiry: {
       type: String,
       requierd: true,
    },
   status: {
       type:Number,
       default: 0
   }

})

const Inquiry = mongoose.model('Inquiry',inquirySchema);
module.exports.Inquiry = Inquiry;