const os = require('os');

console.log(`Platform : ${os.platform()}`);
console.log(`Architecture : ${os.arch()}`)
console.log(`CPU : ${os.cpus().length}`)
console.log(`Total Mem : ${os.totalmem()}`)
console.log(`hostname : ${os.hostname()}`)
console.log(`network : ${JSON.stringify(os.networkInterfaces())}`)
console.log(`'네트워크 인터페이스:', ${JSON.stringify(os.networkInterfaces())}`);