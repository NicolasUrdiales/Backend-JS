const express = require('express')
const app = express()

const products = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.0
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 20.0
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    price: 30.0
  },
  {
    id: 4,
    name: 'Producto 4',
    description: 'Descripción del producto 4',
    price: 40.0
  },
  {
    id: 5,
    name: 'Producto 5',
    description: 'Descripción del producto 5',
    price: 50.0
  },
  {
    id: 6,
    name: 'Producto 6',
    description: 'Descripción del producto 6',
    price: 60.0
  },
  {
    id: 7,
    name: 'Producto 7',
    description: 'Descripción del producto 7',
    price: 70.0
  },
  {
    id: 8,
    name: 'Producto 8',
    description: 'Descripción del producto 8',
    price: 80.0
  },
  {
    id: 9,
    name: 'Producto 9',
    description: 'Descripción del producto 9',
    price: 90.0
  },
  {
    id: 10,
    name: 'Producto 10',
    description: 'Descripción del producto 10',
    price: 100.0
  }
]

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit)
  const result = limit ? products.slice(0, limit) : products
  res.json(result)
})

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const product = products.find(p => p.id === id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ error: 'El producto no existe' })
  }
})

app.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080')
})