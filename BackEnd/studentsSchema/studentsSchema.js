const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registerSchema = new schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    } 
})

const registerStudents = mongoose.model('registerStudents',registerSchema);

module.exports = registerStudents;