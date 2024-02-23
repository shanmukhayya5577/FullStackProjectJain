const mongoose = require('mongoose');
mongoose.connect(process.env.dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((data)=>{
    // console.log(data);
    console.log('DataBase connected')
}).catch((err)=>{
    // console.log(err);
    console.log('Database not connected');
})