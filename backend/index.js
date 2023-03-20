const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log('Backend executando...')
})

async function closeGracefully(signal) {
    console.log(`*^!@4=> Received signal to terminate: ${signal}`)

    const expressPromise = server.close(() => console.log('HTTP server closed'))
    const knexPromise = app.db.destroy().then(() => console.log('Database Connection closed'))

    Promise.all([expressPromise, knexPromise])
        .then(() => process.exit(0))

}

process.on('SIGINT', closeGracefully)

process.on('SIGTERM', closeGracefully)