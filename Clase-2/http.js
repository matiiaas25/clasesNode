 const http = require('node:http')
 const fs = require('node:fs')
 const desirePort = process.env.PORT ?? 1234

 const server = http.createServer((req, res) => { //callback = funcion que se ejecuta cuando pasa algo (ej: recibe req en este caso)
      res.setHeader = ('Content-type', 'text/html; charset=utf-8')

      if (req.url == '/') {
         res.statusCode = 200 // ok
         res.end('Bienvenidos a')
      } else if(req.url === '/contacto') {
         res.end('<h1>Contacto</h1>')
      } else if (req.url === '/x') {
         fs.readFile('./s.jpg', (err, data) => {
            if (err) {
               res.statusCode = 500
               res.end('<h1>Internal Server Error</h1>' + err)
            } else {
               res.setHeader = ('Content-Type', 'image/jpg')
               res.end(data)
            }
         })
      } else {
         res.statusCode = 404
         res.end('<h1>No existe la pagina</h1>')
      }
 })

 server.listen(desirePort, () => {
    console.log(`server listening on port http://localhost:${desirePort}`)
 })