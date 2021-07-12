"use strict";

///   СЛУЖЕБНЫЕ ФУНКЦИИ ....................................................................
/**
   * Корректировка округления десятичных дробей.
   *
   * @param {String}  type  Тип корректировки.
   * @param {Number}  value Число.
   * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
   * @returns {Number} Скорректированное значение.
   */
 function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Десятичное округление к ближайшему
if (!Math.round10) {
    Math.round10 = function (value, exp) {
        return decimalAdjust('round', value, exp);
    };
}
///.....................................................................................................


/* 

Домашняя работа по уроку - 2

Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. 
Продумайте, какие методы понадобятся для работы с этими сущностями.
Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

*/




/*
    Класс товара
*/
class Good {
    constructor (id, title, price, img = "default.png", isFeatured = false) {
        this.id = id;                   // ИД товара
        this.title = title;             // Наименование
        this.descr = "";                // Описание
        this.price = price;             // Цена
        this.img = img;                 // Имя файла изображения
        this.isFeatured = isFeatured;   // Метка, чтобы выводить товар в "рекомендуемых"
    }

    // Сформировать HTML-строку для вывода карточки товара на страницу
    getHTMLstring() {
        let HTMLstring;

        HTMLstring = `<div class="b-productCart" id="${this.id}" data-listid="${this.id}"><div class="b-productCart__wrap"><div class="b-productCart__pic">`;
        HTMLstring += `<img class="b-productCart__img" src="${prefix}img/product/${this.img}" alt="${this.title}">`;
        HTMLstring += '<div class="b-productCart__picInner"><span class="b-btn b-btn_trpdark b-productCart__btn" role="button" title="Положить в корзину">';
        HTMLstring += '<svg class="svg-fon" width="27" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="svg-icon"';
        HTMLstring += ' d="M21.876 22.266a.146.146 0 00.084-.053 3.08 3.08 0 01.023-.027c.037-.042.04-.13.04-.175-.014-.107-.104-.18-.182-.18h-.01c-.078.006-.166.11-.16.232.01.116.096.203.168.203h.037zM8.22 22.26c.099 0 .18-.095.18-.21 0-.116-.081-.21-.18-.21-.1 0-.18.094-.18.21 0 .116.08.21.18.21zM22 24.266h-.16c-1.138 0-2.083-.911-2.163-2.068-.08-1.205.817-2.28 2.018-2.362.05-.003.098-.005.146-.005 1.139 0 2.1.901 2.178 2.057.032.603-.145 1.173-.53 1.613a2.16 2.16 0 01-1.49.765zM8.22 24.26c-1.205 0-2.18-.99-2.18-2.21s.975-2.21 2.18-2.21c1.204 0 2.18.99 2.18 2.21s-.976 2.21-2.18 2.21zm12.978-6.866H9.133a.965.965 0 01-.93-.716L4.278 2.247H1.522A.972.972 0 01.56 1.27c0-.537.432-.977.96-.977H5c.432 0 .817.293.93.717l3.925 14.43h10.704l3.556-8.306H12.258a.973.973 0 01-.962-.978c0-.537.433-.977.962-.977h13.33c.321 0 .626.163.802.44a1 1 0 01.08.928l-4.39 10.26a.963.963 0 01-.882.587z"';
        HTMLstring += ' fill="#fff" /></svg><span>Add to Cart</span></span></div></div>';
        HTMLstring += `<a href="${prefix}pages/product.html" role="button" title="Перейти в карточку товара и купить"><h3 class="b-productCart__heading">${this.title.toUpperCase()}</h3><p class="b-productCart__text">`;
        HTMLstring += 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>';
        HTMLstring += `<p class="b-productCart__price">$${this.price}</p></a></div></div>`;

        return HTMLstring;
    }
}    

/*
    Класс товара в корзине - наименование, цена, изображение, цвет, размер, количество, сумма
 */
class GoodInCart extends Good {
    constructor (id, title, price, img = "default.png", color = "Red", size = "XL") {
        super(id, title, price, img);
        this.color = color;
        this.size = size;
        this.count = 0;
    }

    // Добавление опр. количества
    add(count) {
        this.count += count;
        this._reCalc();
    }

    // Удаление опр. количества
    remove(count) {
        this.count -= count;

        if (this.count <= 0) {
            this.count = 0
            this.sm = 0; 
        } else {
            this._reCalc();
        }
    }

    // Пересчет суммы
    _reCalc() {
        this.sm = Math.round10(this.count * this.price, -2);
    }

    // Сформировать HTML-строку для вывода карточки товара на странице "Корзина"
    getHTMLstring() {
        let HTMLstring;
        
        HTMLstring = `<div class="b-shopcart__item data-cartid="${this.id}""><img class="b-shopcart__img" src="../img/product/${this.img}" alt="${this.title}">`;
        HTMLstring += '<div class="b-shopcart__iteminfo"><button class="b-shopcart__closebtn" type="button" title="Удалить товар из корзины"><img src="../img/svg/close-x.svg" alt="X"></button>';
        HTMLstring += `<h2 class="b-shopcart__itemheading">${this.title.toUpperCase()}</h2><ul class="b-shopcart__iteminfolist">`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Price: <span class="c-mark">$${this.price}</span></li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Color: ${this.color}</li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Size: ${this.size}</li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Quantity: <span class="b-shopcart__iteminfoquant">${this.count}</span></li></ul></div></div>`;

        return HTMLstring;
    }

    // Сформировать HTML-строку для вывода товара в таблице по кнопке "Корзина"
    getHTMLstring4cart() {
        return `<tr><td>${this.title}</td><td>${this.count} шт.</td><td>$${this.price}</td><td>$${this.sm}</td></tr>`;
    }
}

/*
    Класс "корзина"
 */
class Cart {
    constructor () {
        this.totalCount = 0;
        this.totalSum = 0;
        this._getFromCookie();
    }

    // Добавление товара в корзину - товар, количество
    addGood(good, count, isCalc = true) {
        let i = this.goods.findIndex(g => g.id == good.id);

        // Если есть уже такой товар в списке, то просто увеличиваем кол-во на 1, а если нет - добавляем сам товар в массив
        if (i < 0) {
            good.add(count);
            this.goods.push(good);
        } else {
            this.goods[i].add(count);
        }

        // Проверяем метку, нужно ли пересчитывать и писать в куки
        if (isCalc) {
            this._calcTotal();
            this._setIntoCookie();
        }
    }
  
    // Удаление товара из корзины - товар, количество
    removeGood(good, count) {
        let i = this.goods.findIndex(g => g.id == good.id);

        if (indx >= 0) {
            this.goods[i].remove(count);
            this._calcTotal();
            this._setIntoCookie();
        }
    }

    // Полностью удалить товар из корзины - товар
    removeGood(good) {
        let i = this.goods.findIndex( g => g.id == good.id);

        if (i >= 0) {
            this.goods.splice(i, 1);
            this._calcTotal();
            this._setIntoCookie();
        }
    }

    // Подсчет общего количества товаров, и общей суммы
    _calcTotal () {
        this.totalCount = 0;
        this.totalSum = 0;

        if (this.goods.length > 0) {
            this.goods.forEach(
                g => {
                    this.totalCount += g.count;
                    this.totalSum += g.sm;
                }
            );
        }
    }

    // Получить общее количество товаров в корзине
    getTotalCount() {
        return this.totalCount;
    }

    // Получить общую сумму товаров в корзине
    getTotalSum() {
        return this.totalSum;
    }

    // Сформировать HTML-строку для вывода карточек товаров в корзине 
    _getHTMLlist() {
        let goodList = "";
        if (this.goods.length > 0) {
            this.goods.map(
                item => item.getHTMLstring()
            ).join("");
        }
    
        return goodList;
    }
 
    // Сформировать HTML-строку для вывода корзины во всплывающем окне
    _getHTMLcart() {
        let cartContString = "Корзина покупок пуста";

        if (this.goods.length > 0) {
            cartContString = '<table class="cartList"><tbody><tr><th width="90" align="left">Название товара</th><th align="left">Количество</th><th align="left">Цена за шт.</th><th align="left">Итого</th></tr>';
            cartContString += this.goods.map(
                                                item => item.getHTMLstring4cart()
                                            ).join("");
            cartContString += `</tbody></table><p class="cartTotal">Товаров в корзине на сумму: $${this.totalSum}</p>`;
        }
    
        return cartContString;
    }

    // Вставить содержимое корзины на страницу и обновить счетчик
    renderCart(elCart, elCounter) {
        while (elCart.hasChildNodes()) {
            elCart.removeChild(elCart.firstChild);
        }

        elCart.insertAdjacentHTML("afterbegin", this._getHTMLcart());
        elCounter.textContent = this.getTotalCount().toString();
    }

    // Получить товары в корзине из куков
    _getFromCookie() {
        this.goods = [];
   
        for (let key in localStorage) {
           // console.log(key + ": " + localStorage[key]);
            if (key.substring(key.length - 4, 5) == 'cart') {
                let id = parseInt(key.substring(0, key.length - 4));
                let count = parseInt(localStorage[key]);
                let good = goods.find(g => g.id == id);

                if (good) {
                    let goodToCart = new GoodInCart(id, good.title, good.price, good.img);
                    this.addGood(goodToCart, count, false);
                }
            }
        }

        this._calcTotal();
    }
 
    // Записать товары в корзине в куки
    _setIntoCookie() {
        localStorage.clear();

        if (this.goods.length > 0) {
            this.goods.forEach(
                g => {
                    localStorage.setItem(`${g.id}cart`, g.count.toString());
                }
            );
        }
    }
 }

/**
   * Добавление товара в корзину.
   *
   * @param {Object}   el  Кнопка.
*/
function addToCart(el) {
    let parNode = el.closest(".b-productCart");
    let id = parseInt(parNode.dataset.listid);
    let good = goods.find(g => g.id == id);
    let goodToCart = new GoodInCart(id, good.title, good.price, good.img);
    cart.addGood(goodToCart, 1);
    cart.renderCart(cartContEl, cartCntr);
}








// Список товаров, получаемый, например, из MS SQL
const goods = [
    new Good(1, "Warm wool jacket", 249.99, "product-1.png", true),
    new Good(2, "H&N bloose", 149.99, "product-2.png", true),
    new Good(3, "Hot-hot shrink", 59.99, "product-3.png", true),
    new Good(4, "Beauty jamper", 169.99, "product-4.png"),
    new Good(5, "Style shoes", 99.99, "product-5.png", true),
    new Good(6, "Gucci switer", 9.99, "product-6.png"),
    new Good(7, "Italiano style XX", 5.99, "product-7.png", true),
    new Good(8, "Beauty polo", 119.99, "product-8.png"),
    new Good(9, "Velo jersy", 459.99, "product-9.png", true),
    new Good(10, "Winter jacket", 2199.99)
];


/* 
    Определяемся со страницей и в зависимости от страницы берем выводим нужное количество карточек
    если это страница каталога, то выводим 9 карточек как в шаблоне
    если это страница корзины, то выводим 2 карточки, опять же как в шаблоне
    если это индексная страница, выводим 6 карточек в разделе featured items
*/

// Элементы на странице
const PageTitle = document.head.querySelector("title").innerText;
const cartContEl = document.querySelector(".cartContent");                // Таблица - содержимое корзины
const cartBtn = document.querySelector(".b-header__btn_shopCart");        // Кнопка "корзина"
const cartCntr = document.querySelector(".cartCounter");                  // Счетчик товаров в корзине

let countItems = 0;
let $goodList = document.querySelector(".b-productCartList");
let prefix = "../";
let isFeatured = false;
let isCart = false;

switch (PageTitle) {
    case "Интернет-магазин | Каталог":
        countItems = 9;
        break;
        
    case "Интернет-магазин | Корзина":
        countItems = 2;
        $goodList = document.querySelector(".b-shopcart__cart");
        isCart = true;
        break;

    case "Интернет-магазин | Главная":
        prefix = "";
        countItems = 6;
        isFeatured = true;
        break;

    case "Интернет-магазин | Товар":
        $goodList = document.querySelector(".b-prodfeaturedList");
        countItems = 4;
        isFeatured = true;
        break;
}

// Создаем корзину и формируем содержимое корзины и счетчик
let cart = new Cart();
cart.renderCart(cartContEl, cartCntr);


// Обработчик нажатия кнопки "Корзина" 
cartBtn.addEventListener("mouseenter", function () {
    let cartBtnCoords = cartBtn.getBoundingClientRect();        // Координаты кнопки, чтобы не вычислять в стилях. Возможно могут меняться в зависимости от размера экрана

    cartContEl.style.right = (document.documentElement.clientWidth - cartBtnCoords.left - cartBtnCoords.width) + "px";  // Выставляем "содержимое корзины" по оси У
    cartContEl.style.top = (cartBtnCoords.bottom + 3) + "px";                                                         // Выставляем "содержимое корзины" по оси Х

    // Показываем содержимое корзины
    cartContEl.classList.remove("collapse");
});

cartBtn.addEventListener("mouseleave", function () {
    // Скрываем содержимое корзины
    cartContEl.classList.add("collapse");
});

//Формирование на странице списка товаров
function renderGoodList() {
    let list = [];

    if (isCart) {
        list = cart.goods;
    } else {
        if (isFeatured) {
            list  = goods.filter(item => item.isFeatured == true).slice(0, countItems);
        } else {
            list  = goods.slice(0, countItems);
        }
    }

    let goodList = list.map(
        item => item.getHTMLstring()
    ).join("");

    if ($goodList) {
        $goodList.insertAdjacentHTML("afterbegin", goodList);
    }
}

// Формируем на странице список товаров
if (countItems > 0) { 
    renderGoodList();
}

const btns = document.querySelectorAll(".b-productCart__btn");            // Массив кнопок "добавить в корзину"

// Назначаем всем кнопкам "Добавить в корзину" событие клика
btns.forEach(btn => {
    btn.addEventListener("click", function (event) {
        addToCart(event.target);
        event.preventDefault();
    });
});