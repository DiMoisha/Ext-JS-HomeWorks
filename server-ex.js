
//=======================================    Домашнее задание   =======================================
/*
        Урок 7. JavaScript на сервере
  1. Привязать добавление товара в корзину к реальному API.
  2. Добавить API для удаления товара из корзины.
  3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. 
     В файле должны быть поля с названием действия (добавлено/удалено), названием товара, 
     с которым производилось действие и временем, когда оно было совершено.
*/
//=======================================    Домашнее задание   =======================================

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 8080

app.use(express.static('public'));
app.use(bodyParser.json()); // Указываем, что содержимое - JSON

// Функция записи в json статистику
const statRW = function (action, content) {
  fs.readFile('./data/stat.json', 'utf8', (err, data) => {
    if (err) {
      return false;
    } else {
      const stat = JSON.parse(data);
      const item = {
        act: action,
        product_name: content.product_name,
        action_date: (new Date()).toString().split(' ').splice(1,4).join(' ')
      };
      stat.push(item);
    
      fs.writeFile('./data/stat.json', JSON.stringify(stat), (err) => {
        if (err) {
          return false
        } else {
          return true;
        }
      });
    }
  });
}

// Функция добавления/удаления из json корзины
const cartRW = function (action, content) {
  fs.readFile('./data/cart.json', 'utf8', (err, data) => {
    if (err) {
      return '{"result": 0}';
    } else {
      let cart = JSON.parse(data);

      switch (action) {
        case 'add':
          cart.push(content);
          break;

        case 'delete':
          cart = cart.filter(item => item.id_product !== content.id_product)
          break;
      }

      fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          return '{"result": 0}';
        } else {
          statRW(action, content);
          return '{"result": 1}';
        }
      });

    }
  });
}


// КОД С УРОКА
//const jsonParser = bodyParser.json()

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/catalog', (req, res) => {
  fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
})

app.get('/cart', (req, res) => {
  fs.readFile('./data/cart.json', 'utf8', (err, data) => {
    res.send(data);
  });
})

app.get('/stat', (req, res) => {
  fs.readFile('./data/stat.json', 'utf8', (err, data) => {
    res.send(data);
  });
})

app.post('/addToCart', (req, res) => { res.send(cartRW("add", req.body)); });

app.post('/removeFromCart', (req, res) => { res.send(cartRW("delete", req.body)); });
 

// КОД С УРОКА
// app.post('/cart', jsonParser, (req, res) => {
//   fs.readFile('./data/cart.json', 'utf8', (err, data) => {
//       const cart = JSON.parse(data);

//       console.log(req.body)
//       cart.push(req.body)

//       fs.writeFile('./data/cart.json', JSON.stringify(cart), () => {
//           res.end();
//       })
//   });
// })

// app.post('/addToCart', (req, res) => {
//   fs.readFile('./data/cart.json', 'utf8', (err, data) => {
//     if (err) {
//       res.send('{"result": 0}');
//     } else {
//       const cart = JSON.parse(data);
//       const item = req.body;

//       cart.push(item);

//       fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
//         if (err) {
//           res.send('{"result": 0}');
//         } else {
//           res.send('{"result": 1}');
//         }
//       });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})