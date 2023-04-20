const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.lastId = 0;
    const products = this.getAllProducts();
    if (products.length > 0) {
      this.lastId = products[products.length - 1].id;
    }
  }

  addProduct(product) {
    product.id = ++this.lastId;
    const products = this.getAllProducts();
    products.push(product);
    this.saveProducts(products);
  }

  getAllProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getAllProducts();
    return products.find(product => product.id === id);
  }

  updateProductById(id, updatedProduct) {
    const products = this.getAllProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProductById(id) {
    const products = this.getAllProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    this.saveProducts(filteredProducts);
  }

  saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}


const productManager = new ProductManager('./products.json');
const product = {
  title: 'Producto de prueba',
  description: 'Esta es una descripción de prueba',
  price: 9.99,
  thumbnail: 'https://example.com/thumbnail.jpg',
  code: 'ABC123',
  stock: 10
};
productManager.addProduct(product);