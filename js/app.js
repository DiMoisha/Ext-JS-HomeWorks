"use strict";

//=======================================   СЛУЖЕБНЫЕ ФУНКЦИИ   =======================================
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
//=======================================   СЛУЖЕБНЫЕ ФУНКЦИИ   =======================================






//=======================================    Домашнее задание   =======================================
/*
    1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
    2. Добавьте в соответствующие классы методы добавления товара в корзину, 
        удаления товара из корзины и получения списка товаров корзины.
    3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался 
        в обработчике этого промиса.
*/
//=======================================    Домашнее задание   =======================================







//=======================================        ФУНКЦИИ        =======================================
/**
   * Добавление товара в корзину.
   *
   * @param {Object}   el  Кнопка.
*/
function addToCart(el) {
    let parNode = el.closest(".b-productCart");
    let id = parseInt(parNode.dataset.listid);
    app.cart.add(id, 1);
}
//=======================================        ФУНКЦИИ        =======================================

//=======================================      К Л А С С Ы      =======================================
class Good {
    constructor(id, title, descr, price, img = "default.png", isFeatured = false, prefix = "") {
        this._id = id;                      // ИД товара
        this._title = title;                // Наименование
        this._descr = descr;                // Описание
        this._price = price;                // Цена
        this._img = img;                    // Имя файла изображения
        this._isFeatured = isFeatured;      // Метка, чтобы выводить товар в "рекомендуемых"
        this._prefix = prefix;              // Префикс пути к файлу изображения товара
    }

    // Сформировать HTML-строку для вывода карточки товара на страницу
    getHTMLstring() {
        let HTMLstring;

        HTMLstring = `<div class="b-productCart" id="${this._id}" data-listid="${this._id}"><div class="b-productCart__wrap"><div class="b-productCart__pic">`;
        HTMLstring += `<img class="b-productCart__img" src="${this._prefix}img/product/${this._img}" alt="${this._title}">`;
        HTMLstring += '<div class="b-productCart__picInner"><span class="b-btn b-btn_trpdark b-productCart__btn" role="button" title="Положить в корзину">';
        HTMLstring += '<svg class="svg-fon" width="27" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="svg-icon"';
        HTMLstring += ' d="M21.876 22.266a.146.146 0 00.084-.053 3.08 3.08 0 01.023-.027c.037-.042.04-.13.04-.175-.014-.107-.104-.18-.182-.18h-.01c-.078.006-.166.11-.16.232.01.116.096.203.168.203h.037zM8.22 22.26c.099 0 .18-.095.18-.21 0-.116-.081-.21-.18-.21-.1 0-.18.094-.18.21 0 .116.08.21.18.21zM22 24.266h-.16c-1.138 0-2.083-.911-2.163-2.068-.08-1.205.817-2.28 2.018-2.362.05-.003.098-.005.146-.005 1.139 0 2.1.901 2.178 2.057.032.603-.145 1.173-.53 1.613a2.16 2.16 0 01-1.49.765zM8.22 24.26c-1.205 0-2.18-.99-2.18-2.21s.975-2.21 2.18-2.21c1.204 0 2.18.99 2.18 2.21s-.976 2.21-2.18 2.21zm12.978-6.866H9.133a.965.965 0 01-.93-.716L4.278 2.247H1.522A.972.972 0 01.56 1.27c0-.537.432-.977.96-.977H5c.432 0 .817.293.93.717l3.925 14.43h10.704l3.556-8.306H12.258a.973.973 0 01-.962-.978c0-.537.433-.977.962-.977h13.33c.321 0 .626.163.802.44a1 1 0 01.08.928l-4.39 10.26a.963.963 0 01-.882.587z"';
        HTMLstring += ' fill="#fff" /></svg><span>Add to Cart</span></span></div></div>';
        HTMLstring += `<a href="${this._prefix}pages/product.html" role="button" title="Перейти в карточку товара и купить"><h3 class="b-productCart__heading">${this._title.toUpperCase()}</h3>`;
        HTMLstring += `<p class="b-productCart__text">${this._descr}</p>`;
        HTMLstring += `<p class="b-productCart__price">$${this._price}</p></a></div></div>`;

        return HTMLstring;
    }
}    

class GoodInCart extends Good {
    constructor(id, title, price, img = "default.png", color = "Red", size = "XL") {
        super(id, title, "", price, img);
        this._color = color;
        this._size = size;
        this._quantity = 0;
        this._sum = 0;
    }

    add(quantity) {
        this._quantity += quantity;
        this._reCalc();
    }

    remove(quantity) {
        this._quantity -= quantity;

        if (this._quantity <= 0) {
            this._quantity = 0
            this._sum = 0; 
        } else {
            this._reCalc();
        }
    }

     _reCalc() {
        this._sum = Math.round10(this._quantity * this._price, -2);
    }

    // Сформировать HTML-строку для вывода карточки товара на странице "Корзина"
    getHTMLstring() {
        let HTMLstring;
        
        HTMLstring = `<div class="b-shopcart__item" data-cartid="${this._id}"><img class="b-shopcart__img" src="../img/product/${this._img}" alt="${this._title}">`;
        HTMLstring += '<div class="b-shopcart__iteminfo"><button class="b-shopcart__closebtn" type="button" title="Удалить товар из корзины"><img src="../img/svg/close-x.svg" alt="X"></button>';
        HTMLstring += `<h2 class="b-shopcart__itemheading">${this._title.toUpperCase()}</h2><ul class="b-shopcart__iteminfolist">`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Price: <span class="c-mark">$${this._price}</span></li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Color: ${this._color}</li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Size: ${this._size}</li>`;
        HTMLstring += `<li class="b-shopcart__iteminfoitem">Quantity: <span class="b-shopcart__iteminfoquant">${this._quantity}</span></li></ul></div></div>`;

        return HTMLstring;
    }

    // Сформировать HTML-строку для вывода товара в таблице по кнопке "Корзина"
    getHTMLstring4cart() {
        return `<tr><td>${this._title}</td><td>${this._quantity} шт.</td><td>$${this._price}</td><td>$${this._sum}</td></tr>`;
    }
}

class GoodList {
    constructor(config) {
        this._goods = [];                                           // Список товаров общий
        this._goodList = [];                                        // Список товаров на странице
        this._featuredGoods = [];                                   // Список товаров с меткой Featured
        this._filteredGoods = [];                                   // Список товаров, найденных через поиск
        this._$goodListContainer = config.$listContainer;           // Элемент-контейнер DOM, куда выводить список товаров
        this._$featuredGoodListContainer = config.$flistContainer;  // Элемент-контейнер DOM, куда выводить список товаров с меткой Featured
        this._listSize = config.listSize;                           // Отображаемое количество товаров на странице
        this._flistSize = config.flistSize;                         // Отображаемое количество товаров на странице с меткой Featured
        this._source = config.dataSource;                           // URL web-службы, откуда получаем список товаров
        this._prefix = config.prefix;
        this._fetchGoods();
    }

    async _makeGETRequest(callback) {
        const request = new Request(this._source);

        await fetch(request)
                .then((response) => {return response.json()})
                .then((response) => {callback(response)})
                .catch((error) => {console.log(error)});
    }
    
    _fetchGoods() {
        this._makeGETRequest(
            (list) => {
                list.forEach(item => {
                    this._goods.push(new Good(item.id_product, item.product_name, item.product_descr, item.price, item.image, item.featured, this._prefix));
                });

                this._goodList = this._goods.slice(0, this._listSize);
                this._featuredGoods = this._goods.filter(item => item._isFeatured == true).slice(0, this._flistSize);

                this._render(1);            // Вывод списка товаров 
                this._renderFeatured();     // Вывод списка товаров с меткой Featured
                this._btnEvents();          // Назначем кнопкам события
                app.loadCart();             // Грузим корзину из "приложения"
            }
        );
    }

    search(str = "") {
        if (str === "") {
            this._render(1);
        } else {
            const regexp = new RegExp(str, 'i');
            this._filteredGoods = this._goods.filter(item => regexp.test(item._title));
            this._render(2);
        }
    }

    _render(nList = 1) {
        // Обычный список на странице
        if (this._$goodListContainer) {
            let goods = nList === 1 ? this._goodList : this._filteredGoods;
            let goodList = nList === 1 ? "" : "<b>Товаров с похожим наименованием не найдено!</b>";
            
            if (goods.length > 0) {
                goodList = goods.map(
                        item => item.getHTMLstring()
                    ).join("");
            } 

            this._$goodListContainer.innerHTML = "";
            this._$goodListContainer.insertAdjacentHTML('afterbegin', goodList);
        }
    }

    _renderFeatured() {
        // Рекомендуемые товары
        if (this._$featuredGoodListContainer) {
            let fgoodList = "";
                
            if (this._featuredGoods.length > 0) {
                fgoodList = this._featuredGoods.map(
                    item => item.getHTMLstring()
                    ).join("");
            } 
    
            this._$featuredGoodListContainer.innerHTML = "";
            this._$featuredGoodListContainer.insertAdjacentHTML('afterbegin', fgoodList);
        }
    }

    _btnEvents() {
        // Если есть куда выводить список, то назначаем кнопкам событие - "Добавить в корзину"
        if (this._$goodListContainer || this._$featuredGoodListContainer) {
            const $btns = document.querySelectorAll(".b-productCart__btn");            // Массив кнопок "добавить в корзину"

            // Назначаем всем кнопкам "Добавить в корзину" событие клика
            $btns.forEach(btn => {
                btn.addEventListener("click", function (event) {
                    addToCart(event.target);
                    event.preventDefault();
                });
            });

            // и назначем событие кнопке - "Поиск"
            const $btnsearch = document.querySelector(".b-header__btn_search"); 
            $btnsearch.addEventListener("click", function (event) {
                // Выводим форму поиска на страницу
            });
        }
    }

    getList() {
        return this._goods;
    }

    getItemById(id) {
        return this._goods.find(g => g._id === id);
    }
}

// Класс - Корзина покупок
// Корзину храним и достаем из localStorage, т.к. нет авторизованного пользователя для хранения в БД и недоступны куки
class Cart {
    constructor(goodList, config) {
        this._goodList = goodList;                                  // Ссылка на экземпляр класса GoodList
        this._$goodsInCartContainer = config.$cartListContainer;    // Элемент-контейнер DOM, куда выводить список товаров в корзине
        this._$goodsInCartTabContainer = config.$cartTabContainer;  // Элемент-контейнер DOM, куда выводить список товаров в корзине в маленькой таблице
        this._$btnEl = config.$cartBtn;                             // Элемент DOM кнопка "Корзина"
        this._$counterEl = config.$cartCounter;                     // Элемент DOM счетчик, куда выводить общее количество товаров в корзине
        this._$cartTotal = config.$cartTotal;                       // Итоговая сумма без доставки
        this._$cartSubTotal = config.$cartSubTotal;                 // Итоговая сумма
        this._totalQuantity = 0;
        this._totalSum = 0;
        this._getDataFromStorage();
        this._renderTab();
        this._renderList();
        this._btnEvents();
    }

    // Добавление товара в корзину - ID товара, количество
    add(id, quantity = 1, isCalc = true) {
        let i = this._goods.findIndex(g => g._id === id);

        // Если есть уже такой товар в списке, то просто увеличиваем кол-во на 1, а если нет - добавляем сам товар в массив
        if (i < 0) {
            let good = this._goodList.getItemById(id);

            if (good) {
                let goodToCart = new GoodInCart(id, good._title, good._price, good._img);
                goodToCart.add(quantity);
                this._goods.push(goodToCart);
            }
        } else {
            this._goods[i].add(quantity);
        }

        // Проверяем метку, нужно ли пересчитывать и писать в куки
        if (isCalc) {
            this._calcTotal();
            this._setDataIntoStorage();
            this._renderTab();
            this._renderList();
            this._btnEvents();
        }
    }

    // Удаление товара из корзины - ID товара, количество
    remove(id, quantity) {
        let i = this.goods.findIndex(g => g._id === id);

        if (indx >= 0) {
            this._goods[i].remove(quantity);
            this._calcTotal();
            this._setDataIntoStorage();
            this._renderTab();
            this._renderList();
            this._btnEvents();
        }
    }

    // Полностью удалить товар из корзины - ID товара
    del(id) {
        let i = this._goods.findIndex( g => g._id === id);

        if (i >= 0) {
            this._goods.splice(i, 1);
            this._calcTotal();
            this._setDataIntoStorage();
            this._renderTab();
            this._renderList();
            this._btnEvents();
        }
    }

    clear() {
        this._goods = [];            // Обнуляем список
        this._setDataIntoStorage();  // Чистим куки
        window.location.reload();   // Перезагружаем страницу
    }
    
    // Подсчет общего количества товаров, и общей суммы
    _calcTotal () {
        this._totalCount = 0;
        this._totalSum = 0;

        if (this._goods.length > 0) {
            this._goods.forEach(
                g => {
                    this._totalCount += g._quantity;
                    this._totalSum += g._sum;
                }
            );

            this._totalSum = Math.round10(this._totalSum, -2);
        }
    }

    _getTotalCount() {
        return this._totalCount;
    }

    _getTotalSum() {
        return this._totalSum;
    }

    // Вывод на страницу списка товаров в корзине
    _renderList() {
        if (this._$goodsInCartContainer) {
            let goodList = "<b>Товаров в корзине нет!</b>";

            if (this._goods.length > 0) {
                goodList = this._goods.map(
                    item => item.getHTMLstring()
                ).join("");

                goodList += '<div class="b-shopcart__btns"><a class="b-shopcart__btn b-shopcart__btn_clear" href="" title="Очистить корзину">CLEAR SHOPPING CART</a>';
                goodList += '<a class="b-shopcart__btn b-shopcart__btn_ret" href="../pages/catalog.html" title="Продолжить покупки">CONTINUE SHOPPING</a></div>';
            }

            this._$goodsInCartContainer.innerHTML = "";
            this._$goodsInCartContainer.insertAdjacentHTML('afterbegin', goodList);
            this._$cartTotal.innerHTML = this._getTotalSum().toString();                      
            this._$cartSubTotal.innerHTML = this._getTotalSum().toString();         
        }
    }

    // Сформировать HTML-строку для вывода корзины во всплывающем окне
    _getHTMLcart() {
        let cartContString = "Корзина покупок пуста";

        if (this._goods.length > 0) {
            cartContString = '<table class="cartList"><tbody><tr><th width="90" align="left">Название товара</th><th align="left">Количество</th><th align="left">Цена за шт.</th><th align="left">Итого</th></tr>';
            cartContString += this._goods.map(
                                                item => item.getHTMLstring4cart()
                                            ).join("");
            cartContString += `</tbody></table><p class="cartTotal">Товаров в корзине на сумму: $${this._totalSum}</p>`;
        }
    
        return cartContString;
    }

    // Вставить содержимое корзины на страницу и обновить счетчик
    _renderTab() {
        if (this._$goodsInCartTabContainer && this._$counterEl) {
            while (this._$goodsInCartTabContainer.hasChildNodes()) {
                this._$goodsInCartTabContainer.removeChild(this._$goodsInCartTabContainer.firstChild);
            }

            this._$goodsInCartTabContainer.insertAdjacentHTML("afterbegin", this._getHTMLcart());
            this._$counterEl.textContent = this._getTotalCount().toString();
        }
    }
    
    _btnEvents() {
        // Обработчик нажатия кнопки "Корзина" 
        this._$btnEl.addEventListener("mouseenter", function () {
            let cartBtnCoords = app.cart._$btnEl.getBoundingClientRect();        // Координаты кнопки, чтобы не вычислять в стилях. Возможно могут меняться в зависимости от размера экрана

            app.cart._$goodsInCartTabContainer.style.right = (document.documentElement.clientWidth - cartBtnCoords.left - cartBtnCoords.width) + "px";  // Выставляем "содержимое корзины" по оси У
            app.cart._$goodsInCartTabContainer.style.top = (cartBtnCoords.bottom + 3) + "px";                                                         // Выставляем "содержимое корзины" по оси Х

            // Показываем содержимое корзины
            app.cart._$goodsInCartTabContainer.classList.remove("collapse");
        });

        this._$btnEl.addEventListener("mouseleave", function () {
            // Скрываем содержимое корзины
            app.cart._$goodsInCartTabContainer.classList.add("collapse");
        });

        const _$cartItemDelBtns = document.querySelectorAll(".b-shopcart__closebtn");   // Кнопки удаления товаров из корзины
        if (_$cartItemDelBtns) {
            _$cartItemDelBtns.forEach(item => {
                item.addEventListener("click", function (event) {
                    // Удаляем товар из корзины полностью
                    let parNode = event.target.closest(".b-shopcart__item");
                    let id = parseInt(parNode.dataset.cartid);
                    app.cart.del(id);
                });
            });
        }

        // Назначем кнопке событие кнопке "Очистить корзину"
        const _$btnCartClear = document.querySelector(".b-shopcart__btn_clear");
        if (_$btnCartClear) {
            _$btnCartClear.addEventListener("click", function(event) {
                app.cart.clear();
                event.preventDefault();
            });
        }
    }

    _getDataFromStorage() {
        this._goods = [];
   
        for (let key in localStorage) {
            if (key.substring(key.length - 4, key.length) === 'cart') {
                let id = parseInt(key.substring(0, key.length - 4));
                let quantity = parseInt(localStorage[key]);
                this.add(id, quantity, false);
            }
        }

        this._calcTotal();
    }

    _setDataIntoStorage() {
        localStorage.clear();

        if (this._goods.length > 0) {
            this._goods.forEach(
                g => {
                    localStorage.setItem(`${g._id}cart`, g._quantity.toString());
                }
            );
        }
    }
}
//=======================================      К Л А С С Ы      =======================================



const app = {
    goodList: null,
    cart: null,

    config: {
        prefix: "../",
        $listContainer: null,
        $flistContainer: null,
        $cartListContainer: null,
        $cartTabContainer: null,
        $cartCounter: null,
        $cartBtn: null,
        listSize: 9,
        flistSize: 6,
        dataSource: "https://raw.githubusercontent.com/DiMoisha/catalog/a45dfb1ab160b462a00cda8da6de116c5b99681e/catalog.json"
    },

    init() {
        this.config.$listContainer = document.getElementById("good-list");          // Контейнер - список товаров

        if (this.config.$listContainer) {
            let gsize = +this.config.$listContainer.dataset.listsize;

            if (typeof gsize  === "number") {
                this.config.listSize = gsize;
            }
        }

        this.config.$flistContainer = document.getElementById("featured-list");     // Контейнер - список рекомендуемых товаров

        if (this.config.$flistContainer) {
            let fsize = +this.config.$flistContainer.dataset.listsize;

            if (typeof fsize  === "number") {
                this.config.flistSize = fsize;
            }
        }

        this.config.$cartListContainer = document.getElementById("cart-list");      // Контейнер - список товаров в корзине
        this.config.$cartTabContainer = document.querySelector(".cartContent");     // Таблица - содержимое корзины
        this.config.$cartBtn = document.querySelector(".b-header__btn_shopCart");   // Кнопка "корзина"
        this.config.$cartCounter = document.querySelector(".cartCounter");          // Счетчик товаров в корзине
        this.config.$cartTotal = document.querySelector("#cart-subtotal");          // Итоговая сумма без доставки
        this.config.$cartSubTotal = document.querySelector("#cart-total");          // Итоговая сумма
       
        if (document.head.querySelector("title").innerText == "Интернет-магазин | Главная") {
            this.config.prefix = "";
        }
    },

    loadCart() {
        this.cart = new Cart(this.goodList, this.config);
    },

    run() {
        this.init();
        this.goodList = new GoodList(this.config);
    }
}

app.run()