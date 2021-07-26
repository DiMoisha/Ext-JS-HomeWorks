"use strict";

//=======================================    Домашнее задание   =======================================
/*
    Урок 5. Фреймворк Vue.js
    1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine и 
        привязать к нему содержимое поля ввода. На кнопку «Искать» добавить обработчик клика, 
        вызывающий метод FilterGoods.
    2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных 
        поле isVisibleCart, управляющее видимостью корзины.
    3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.
*/
//=======================================    Домашнее задание   =======================================

const API_URL = 'https://raw.githubusercontent.com/DiMoisha/catalog/a45dfb1ab160b462a00cda8da6de116c5b99681e';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status != 200) {
                        callback([]);
                        return;

                    } else {
                        callback(xhr.response);
                    }
                }
            }

            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onloadend = function () {
                if (xhr.status == 404) {
                    console.log("Запрос на получение данных не удался");
                }
            }

            xhr.send();
        },

        FilterGoods() {
            const regex = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter((x) => regex.test(x.product_name));
        },

        ShowCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        AddToCart(event) {
            this.cartGoods.push(this.goods.find(x => x.id_product == event.target.id));
        }

    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalog.json`, (goods) => {
            this.goods = goods;
            this.filteredGoods = goods;
        });
    }
});