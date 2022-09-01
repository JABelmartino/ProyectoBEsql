const express = require('express')
const { Router } = express
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt')
const contenedor2 = new Contenedor('./mensajes.txt')
const {Server: HTTPServer} = require('http')
const {Server: IOServer} = require('socket.io')


const app = express()
const routerProductos = Router()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

app.set('views','./views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

httpServer.listen(8080, () =>{
    console.log(httpServer.address().port)
})
httpServer.on('error', err => console.log(err))

const arrayProductos = []
///-Productos-///

routerProductos.get('/', async (req, res) => {
    const productos = await contenedor.getProductos()
    res.render('index', {formulario: productos}) 
})

io.on('connection', async (socket) =>{
    const productos =  await contenedor.getProductos()
    socket.emit('mensaje-servidor', {productos} )
    socket.on('mensaje-nuevo', (productoNuevo) =>{
        productos.push(productoNuevo)
        contenedor.postProducto(productoNuevo)
      const listNueva = {
        mensaje: 'ok',   
        productos
      }
      io.sockets.emit('mensaje-servidor', listNueva)
    }) 
})

io.on('connection', async (socket) =>{
    const mensajes =  await contenedor.getMensajes()
    socket.emit('mensaje-servidor2', {mensajes})
    socket.on('mensaje-nuevo2', (mensajeNuevo) =>{
        mensajes.push(mensajeNuevo)
        contenedor.postMensaje(mensajeNuevo)
      const listMensaje = {
        mensaje: 'ok',   
        mensajes
      }
      io.sockets.emit('mensaje-servidor2', listMensaje)
    }) 
})
app.use('/', routerProductos)






