const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(9900,()=>{
    console.log('Server is listing at 9900')
});

 