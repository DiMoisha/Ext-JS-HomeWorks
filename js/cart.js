//Homework - 8
/*
    Реализована только логика добавления в корзину, без удаления.
    Суть реализации(ТЗ): 
    1. Cоздается массив объектов, класса Product, описывающего какой-то товар. Изначально массив пуст.
    2. При нажатии на кнопку "Добавить в корзину", происходит добавление в массив товаров.
        Если в массиве уже есть такой товар, то его количество увеличивается на 1 и происходит пересчет,
        если нет - добавляется новый объект в массив.
    3. Из массива товаров формируется контент таблицы корзины. Если массив пуст(изначально) - выводится сообщение "Корзина покупок пуста"
    4. Таблица корзины покупок появлется/исчезает при нажатии на "корзину"
    5. Счетчик корзины  - это сумма количества всех товаров. Изначально равен 0.
*/

// Функция округления скоммуниздина с доков мозиллы
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

// Класс продукт
class Product {
    constructor(name, price) {
        this.name = name;
        this.count = 1;
        this.price = price;
        this.sm = price;
    }
    add(count) {
        this.count += count;
        this.sm = Math.round10(this.count * this.price, -2);
    }
}

// Массив продуктов в корзине
let products = [];      

// Элементы на странице
let cartContEl = document.querySelector(".cartContent");                // Таблица - содержимое корзины
let cartBtn = document.querySelector(".b-header__btn_shopCart");        // Кнопка "корзина"
let cartCntr = document.querySelector(".cartCounter");                  // Счетчик товаров в корзине
let btns = document.querySelectorAll(".b-productCart__btn");          // Массив кнопок "добавить в корзину"


/**
   * Добавление товара в массив.
   *
   * @param {String}  name  Наименование товара.
   * @param {Number} price  Цена за ед.
*/
function addToProducts(name, price) {
    let i = products.findIndex(p => p.name == name);

    // Если есть уже такой товар в списке, то просто увеличиваем кол-во на 1, а если нет - добавляем сам товар в массив
    if (i < 0) {
        let product = new Product(name, price);
        products.push(product);
    } else {
        products[i].add(1);
    }
}

/**
   * Добавление товара в корзину.
   *
   * @param {Object}   el  Кнопка.
*/
function addToCart(el) {
    // Карточка товара
    let parNode = el.closest(".b-productCart");

    // Ищем в ней наименование и цену и добавляем в массив товаров
    if (parNode) {
        let name = parNode.querySelector(".b-productCart__heading").innerHTML.trim();
        let price = parseFloat(parNode.querySelector(".b-productCart__price").innerHTML.trim().slice(1));

        addToProducts(name, price);
    }

    // Логика - формируем содержимое корзины и рассчитываем итоговые цифры
    let totalCount = 0;
    let totalSum = 0;
    let cartContString = '<table class="cartList"><tbody><tr><th width="90" align="left">Название товара</th><th align="left">Количество</th><th align="left">Цена за шт.</th><th align="left">Итого</th></tr>';

    products.forEach(product => {
        cartContString += `<tr><td>${product.name}</td><td>${product.count} шт.</td><td>$${product.price}</td><td>$${product.sm}</td></tr>`;

        totalCount += product.count;
        totalSum += product.sm;
    });

    cartContString += `</tbody></table><p class="cartTotal">Товаров в корзине на сумму: $${totalSum}</p>`;
    cartContEl.innerHTML = "";
    cartContEl.insertAdjacentHTML("afterbegin", cartContString);
    cartCntr.textContent = `${totalCount}`;
}


// Назначаем всем кнопкам "Добавить в корзину" событие клика
btns.forEach(btn => {
    btn.addEventListener("click", function (event) {
        addToCart(event.target);
    });
});


// Обработчик нажатия кнопки корзина
cartBtn.addEventListener("mouseover", function () {
    let cartBtnCoords = cartBtn.getBoundingClientRect();        // Координаты кнопки, чтобы не вычислять в стилях. Возможно могут меняться в зависимости от размера экрана

    cartContEl.style.right = (document.documentElement.clientWidth - cartBtnCoords.left - cartBtnCoords.width) + "px";  // Выставляем "содержимое корзины" по оси У
    cartContEl.style.top = (cartBtnCoords.bottom + 3) + "px";                                                         // Выставляем "содержимое корзины" по оси Х

    // Скрываем/показываем содержимое корзины
    cartContEl.classList.toggle("collapse");
});