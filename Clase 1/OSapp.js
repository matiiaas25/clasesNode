const os = require ('node:os')

console.log('info os: ', os.platform())
console.log('Version os: ', os.release())
console.log('Arquitectura os: ', os.arch())
console.log('CPUs os: ', os.cpus())
console.log('Mem os: ', os.freemem() / 1024 / 1024)
console.log('TotalMem os: ', os.totalmem())
console.log('uptime os: ', os.uptime() / 60 /60)
