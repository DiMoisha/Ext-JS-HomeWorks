
let express = require('express');
let fs = require('fs');
var bodyParser = require('body-parser') 


const app = express();

class GoodInCart {
  constructor(good, quantity = 1, size = "XL", color = "red") {
    this.id = good.id,
    this.image = good.image,
    this.product_name = good.product_name,
    this.product_desc = good.product_desc,
    this.price = good.price,
    this.quantity = quantity,
    this.size = size,
    this.color = color
  }
}

 
// create application/json parser
var jsonParser = bodyParser.json()

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/good', (req, res) => {
    fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/api/cart', jsonParser, (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);

      const item = req.body;

      //const goodInCart = cart.find((good) => good.id === item.id);
      const idx = cart.findIndex(x => x.id === item.id);
      
      if(idx >= 0) {
        cart[idx].quantity++;
      } else {
        cart.push(new GoodInCart(item));
      }

      fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
        console.log('done');
        res.send('ok')
      });
    });
  }); 

  app.post('/api/changecart', jsonParser, (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);
      const item = req.body;
      const idx = cart.findIndex(x => x.id === item.id);
      
      if(idx >= 0) {
        cart[idx] = item;
      } 

      fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
        console.log('done');
        res.send('ok')
      });
    });
  }); 

  app.post('/api/removecart', jsonParser, (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
      let cart = JSON.parse(data);
      const item = req.body;
      cart = cart.filter(x => x.id !== item.id);
   
      fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
        console.log('done');
        res.send('ok')
      });
    });
  }); 

  app.post('/api/delcart', jsonParser, (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
      let cart = JSON.parse(data);
      cart = [];
      fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
        console.log('done');
        res.send('ok')
      });
    });
  }); 


    app.get('/api/stat', (req, res) => {
      fs.readFile('./data/stat.json', 'utf8', (err, data) => {
          res.send(data);
      });
    });

    app.post('/api/stat', jsonParser, (req, res) => {
      fs.readFile('./data/stat.json', 'utf8', (err, data) => {
        const stat = JSON.parse(data);
  
        const item = {...req.body, date: new Date()};
      
        stat.push(item);
  
        fs.writeFile('./data/stat.json', JSON.stringify(stat), (err) => {
          console.log('done');
          res.send('ok')
        });
  
    });
  });


app.listen(3000, () => {
  console.log('server is running on port 3000!');
});