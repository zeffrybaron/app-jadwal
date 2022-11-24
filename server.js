const { app, port } = require ('./index')

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})