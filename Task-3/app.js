/*
    3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
    ### Маленький (50 рублей, 20 калорий).
    ### Большой (100 рублей, 40 калорий). 
    ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
    ### С сыром (+10 рублей, +20 калорий).
    ### С салатом (+20 рублей, +5 калорий).
    ### С картофелем (+15 рублей, +10 калорий). 
    ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий)
    и полить майонезом (+20 рублей, +5 калорий). 
    ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
    Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.
*/

"use strict";

/*
    Собирать класс "Гамбургер" будем из разных классов, используя определенный уровень абстракции
    Гамбургеру из реального мира сопоставим публичный класс Hamburger, доступный "клиентам"
    Размеры гамбургера, его цена, калорийность, начинка, добавки и т.д. - это фиксированные штучки,
    поэтому их можно объявить константами. В реальном мире - это наша кухня.
    Далее, в зависимости от заказа клиента, его пожеланий - собираем гамбургер. 
    Для этого передаем в конструктор гамбургера - размер, начинку, добавку(необязательно).
    Полученный(инстанциированный) объект "гамбургер" используем чтобы с помощью вызова методов,
    узнать начинку, цену, калорийность.
    
    Все классы описываем минимально необходимым набором свойств и методов.
    Каждый класс отвечает только за свою предметную область.
    Наследование в рамках поставленной задачи не имеет смысла.  
*/


// Класс - размер гамбургера. Определяет цену и калории в зависимости от размера.
class _Size {
    constructor(size, price, calories) {
        this.size = size;
        this.price = price;
        this.calories = calories;
    }
}

// Класс - начинка гамбургера. Определяет завышение цены и калорий в зависимости от начинки.
class _Stuffing {
    constructor(stuffing, overprice, overcalories) {
        this.stuffing = stuffing;
        this.overprice = overprice;
        this.overcalories = overcalories;
    }
}

// Класс - добавка гамбургера. Определяет завышение цены и калорий в зависимости от приправы.
class _Toping {
    constructor(topping, overprice, overcalories) {
        this.topping = topping;
        this.overprice = overprice;
        this.overcalories = overcalories;
    }
}


// Массив(список) доступных размеров гамбургера. 
// Состоит из объектов "размер", что очень удобно при обращении к именованным свойствам
const sizes = [
    new _Size("Small", 50, 20),
    new _Size("Big", 100, 40)
];

// Массив(список) доступных начинок гамбургера. 
const stuffings = [
    new _Stuffing("Cheese", 10, 20),
    new _Stuffing("Salade", 20, 5),
    new _Stuffing("Potato", 15, 10)
];

// Массив(список) доступных приправ гамбургера. 
const toppings = [
    new _Toping("Sauce", 15, 0),
    new _Toping("Mayonnaise", 20, 5)
];


class Hamburger {
    constructor(size, stuffing) { 
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    // Добавить добавку 
    addTopping(topping) {  
        let toppingEl = toppings.find( t => t.topping == topping);

        if (toppingEl) {
            this.toppings.push(toppingEl);
        }
    }

    // Убрать добавку 
    removeTopping(topping) { 
        let indx = this.toppings.findIndex( t => t.topping == topping);

        if (indx >= 0) {
            this.toppings.splice(indx, 1);
        }
    }
  
    // Получить список добавок 
    //getToppings(topping) {   
    getToppings() {   
        let toppings = "";

        if (this.toppings.length > 0) {
            for (let i = 0; i < this.toppings.length; i++) {
                let d = i == this.toppings.length - 1 ? "" : ", "; 
                toppings += `${this.toppings[i].topping}${d}`;
            }
        }

        return toppings == "" ? "Добавок нет" : toppings;
    }

    // Узнать размер гамбургера
    getSize() {
        return this.size;
    }
   
    // Узнать начинку гамбургера
    getStuffing() {           
        return this.stuffing;
    }

    // Узнать цену
    calculatePrice() {  
        let totalPrice = sizes.find(s => s.size == this.size).price;
        totalPrice += stuffings.find(s => s.stuffing == this.stuffing).overprice;
        
        if (this.toppings.length > 0) {
            this.toppings.forEach(
                t => totalPrice += t.overprice
            );
        }

        return totalPrice;
    }

    // Узнать калорийность
    calculateCalories() {     
        let totalCalories = sizes.find(s => s.size == this.size).calories;
        totalCalories += stuffings.find(s => s.stuffing == this.stuffing).overcalories;
        
        if (this.toppings.length > 0) {
            this.toppings.forEach(
                t => totalCalories += t.overcalories
            );
        }
       
        return totalCalories;
    }
}


// Делаем пару гамбургеров - самый калорийный для изнеможденных учебой на Грикбрэйнс и диетический для фитоняшек
// Ну и просим продавца подробнее рассказать про каждый гамбургер
console.log("Вы заказали гамбургер: ");
let bigHamburger_P_S_M = new Hamburger("Big", "Potato");
bigHamburger_P_S_M.addTopping("Sauce");
bigHamburger_P_S_M.addTopping("Mayonnaise");
console.log(`Размер: ${bigHamburger_P_S_M.getSize()}`);
console.log(`Начинка: ${bigHamburger_P_S_M.getStuffing()}`);
console.log(`Добавки: ${bigHamburger_P_S_M.getToppings()}`);
console.log(`Цена: ${bigHamburger_P_S_M.calculatePrice()} рублей`);
console.log(`Калории: ${bigHamburger_P_S_M.calculateCalories()} калорий`);

console.log("");

console.log("Вы заказали гамбургер: ");
let smallHamburger_C = new Hamburger("Small", "Cheese");
console.log(`Размер: ${smallHamburger_C.getSize()}`);
console.log(`Начинка: ${smallHamburger_C.getStuffing()}`);
console.log(`Добавки: ${smallHamburger_C.getToppings()}`);
console.log(`Цена: ${smallHamburger_C.calculatePrice()} рублей`);
console.log(`Калории: ${smallHamburger_C.calculateCalories()} калорий`);
