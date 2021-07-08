"use strict";

/**
 * Функция сворачивания/разворачивания меню
 *  */
function collapse(menu_class){
    let omenu = document.querySelector('.' + menu_class);
    omenu.classList.toggle('collapse');
}



// Домашняя работа по уроку - 1
/* 

1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить? 

Ответ на 1 и 2 вопрос в теле скрипта ниже. 
Ответ на 3 вопрос - запятая ставится из-за массива, в котром элементы разделяются запятой - это очевидно. 
Исправить это можно склейкой через join, впрочем не буду умничать - это подсказал сам преподаватель на лекции.

*/


/*
    Класс карточки товара - наименование, цена, изображение, цвет, размер, количество
    Это класс для отработки этой домашки, в реальном, итоговом проекте, будет иначе
 */
class Good {
    constructor (title, price, img, color, size, quantity) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
    }
}

// Список карточек товаров - каталог, массив
const goods = [ new Good("Warm wool jacket", 249.99, "product-1.png", "Red", "XL", 2),
                new Good("H&N bloose", 149.99, "product-2.png", "Blue", "L", 2),
                new Good("Hot-hot shrink", 59.99, "product-3.png", "Green", "M", 1),
                new Good("Beauty jamper", 169.99, "product-4.png", "Yellow", "XS", 3),
                new Good("Style shoes", 99.99, "product-5.png", "Cyan", "M", 1),
                new Good("Gucci switer", 9.99, "product-6.png", "Black", "XXL", 4),
                new Good("Italiano style XX", 5.99, "product-7.png", "White", "M", 2),
                new Good("Beauty polo", 119.99, "product-8.png", "Orange", "S", 1),
                new Good("Velo jersy", 459.99, "product-9.png", "Brown", "XXL", 1)
            ];

// Функция рендера разметки карточки товара для каталога или главной страницы
function renderHTMLGoodItem(good, gtype, prefix, tag) {
    let HTMLstring;
    
    if (gtype == 0) { 
        // Карточка товара для каталога   
            HTMLstring = '<div class="b-productCart"><div class="b-productCart__wrap"><div class="b-productCart__pic">';
            HTMLstring += `<img class="b-productCart__img" src="${prefix}img/product/${good.img}" alt="${good.title}">`;
            HTMLstring += `<div class="b-productCart__picInner"><${tag} class="b-btn b-btn_trpdark b-productCart__btn" href="${prefix}pages/product.html" role="button" title="Перейти в карточку товара и купить">`;
            HTMLstring += '<svg class="svg-fon" width="27" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="svg-icon"';
            HTMLstring += ' d="M21.876 22.266a.146.146 0 00.084-.053 3.08 3.08 0 01.023-.027c.037-.042.04-.13.04-.175-.014-.107-.104-.18-.182-.18h-.01c-.078.006-.166.11-.16.232.01.116.096.203.168.203h.037zM8.22 22.26c.099 0 .18-.095.18-.21 0-.116-.081-.21-.18-.21-.1 0-.18.094-.18.21 0 .116.08.21.18.21zM22 24.266h-.16c-1.138 0-2.083-.911-2.163-2.068-.08-1.205.817-2.28 2.018-2.362.05-.003.098-.005.146-.005 1.139 0 2.1.901 2.178 2.057.032.603-.145 1.173-.53 1.613a2.16 2.16 0 01-1.49.765zM8.22 24.26c-1.205 0-2.18-.99-2.18-2.21s.975-2.21 2.18-2.21c1.204 0 2.18.99 2.18 2.21s-.976 2.21-2.18 2.21zm12.978-6.866H9.133a.965.965 0 01-.93-.716L4.278 2.247H1.522A.972.972 0 01.56 1.27c0-.537.432-.977.96-.977H5c.432 0 .817.293.93.717l3.925 14.43h10.704l3.556-8.306H12.258a.973.973 0 01-.962-.978c0-.537.433-.977.962-.977h13.33c.321 0 .626.163.802.44a1 1 0 01.08.928l-4.39 10.26a.963.963 0 01-.882.587z"';
            HTMLstring += ` fill="#fff" /></svg><span>Add to Cart</span></${tag}></div></div>`;
            HTMLstring += `<h3 class="b-productCart__heading">${good.title.toUpperCase()}</h3><p class="b-productCart__text">`;
            HTMLstring += 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>';
            HTMLstring += `<p class="b-productCart__price">$${good.price}</p></div></div>`;
    } else {
        // Карточка товара для корзины
            HTMLstring = `<div class="b-shopcart__item"><img class="b-shopcart__img" src="../img/product/${good.img}" alt="${good.title}">`;
            HTMLstring += '<div class="b-shopcart__iteminfo"><button class="b-shopcart__closebtn" type="button" title="Удалить товар из корзины"><img src="../img/svg/close-x.svg" alt="X"></button>';
            HTMLstring += `<h2 class="b-shopcart__itemheading">${good.title.toUpperCase()}</h2><ul class="b-shopcart__iteminfolist">`;
            HTMLstring += `<li class="b-shopcart__iteminfoitem">Price: <span class="c-mark">$${good.price}</span></li>`;
            HTMLstring += `<li class="b-shopcart__iteminfoitem">Color: ${good.color}</li>`;
            HTMLstring += `<li class="b-shopcart__iteminfoitem">Size: ${good.size}</li>`;
            HTMLstring += `<li class="b-shopcart__iteminfoitem">Quantity: <span class="b-shopcart__iteminfoquant">${good.quantity}</span></li></ul></div></div>`;
    }
 
    return HTMLstring;
}

/* 
    Определяемся со страницей и в зависимости от страницы берем выводим нужное количество карточек
    если это страница каталога, то выводим 9 карточек как в шаблоне
    если это страница корзины, то выводим 2 карточки, опять же как в шаблоне
    если это индексная страница, выводим 6 карточек в разделе featured items
*/

let gtype = 0;
let countItems = 0;
let $goodList = document.querySelector(".b-productCartList");
const PageTitle = document.head.querySelector("title").innerText;
let prefix = "../";
let tag = "a";      // Если страница "Главная", то кнопка "Добавить в корзину" добавляет в корзину и при наведении мыши смотрим содержимое корзины
                    // в других случаях - по кнопке "Добавить в корзину" открывается страница "Product". Эта переменная разруливает ситуацию
                    // Это времянка, для предыдущей домашки. В итоговой версии - всего этого не будет

switch (PageTitle) {
    case "Интернет-магазин | Каталог":
        countItems = 9;
        break;
        
    case "Интернет-магазин | Корзина":
        countItems = 2;
        $goodList = document.querySelector(".b-shopcart__cart");
        gtype = 1;
        break;

    case "Интернет-магазин | Главная":
        prefix = "";
        tag = "span";
        countItems = 6;
        break;
}

// Перебираем массив 
const renderGoodList = (list = goods.slice(0, countItems)) => {
    let goodList = list.map(
        item => renderHTMLGoodItem(item, gtype, prefix, tag)
    ).join("");

    $goodList.insertAdjacentHTML("afterbegin", goodList);
}

if (countItems > 0) { 
    renderGoodList();
}