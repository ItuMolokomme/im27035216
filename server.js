const http = require('https')
const fs = require('fs')
const app = require('./index')
const port = 3000

const options = {
    key: fs.readFileSync('Keys/privatekey.pem'),
    cert: fs.readFileSync('Keys/certificate.pem')
}
const server = http.createServer(options, app)

server.listen(port, () =>{
    console.log('Server started on port ' + port)
})