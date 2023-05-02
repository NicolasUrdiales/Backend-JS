const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Middleware para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para permitir el acceso desde cualquier origen (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rutas para manejar los productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }

    let productos = JSON.parse(data);
    
    // Si se especifica un límite de productos, se aplicará la restricción
    if (req.query.limit) {
      productos = productos.slice(0, req.query.limit);
    }

    res.json(productos);
  });
});

productsRouter.get('/:pid', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }

    const productos = JSON.parse(data);
    const producto = productos.find(p => p.id == req.params.pid);

    if (!producto) {
      res.status(404).send('Producto no encontrado');
      return;
    }

    res.json(producto);
  });
});

productsRouter.post('/', (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body,
    status: true
  };

  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }

    const productos = JSON.parse(data);
    productos.push(newProduct);

    fs.writeFile('productos.json', JSON.stringify(productos), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo de productos');
        return;
      }

      res.json(newProduct);
    });
  });
});

productsRouter.put('/:pid', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }

    let productos = JSON.parse(data);
    const index = productos.findIndex(p => p.id == req.params.pid);

    if (index === -1) {
      res.status(404).send('Producto no encontrado');
      return;
    }

    productos[index] = {
      id: req.params.pid,
      ...req.body,
      status: productos[index].status
    };

    fs.writeFile('productos.json', JSON.stringify(productos), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo de productos');
        return;
      }

      res.json(productos[index])});
   
