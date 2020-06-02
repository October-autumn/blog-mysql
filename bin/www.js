const http = require('http');
const serverHandle = require('../app');

const server = http.createServer(serverHandle);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});