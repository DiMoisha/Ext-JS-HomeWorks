"use strict";

//=======================================    Домашнее задание   =======================================
/*
        Урок 6. Компоненты Vue.js
    1. Вынести поиск в отдельный компонент.
    2. Вынести корзину в отдельный компонент.
    3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, 
                когда не удаётся выполнить запрос к серверу.
*/
//=======================================    Домашнее задание   =======================================

//=======================================   VUE.JS компоненты  =======================================
// Шина событий
var eventBus = new Vue();

// Компонент блока поиска
Vue.component('search-block', {
    props: ['_searchLine'],
    template: `
        <div class="search">
            <input type="search" class="goods-search" v-model="_searchLine" v-on:keydown.enter="FilterGoods">
            <button class="search-button" type="button" @click="FilterGoods">Искать</button>
            <button class="cart-button" type="button" @click="ShowCart">Корзина</button>
        </div>
        `
    ,
  
    methods: {
        FilterGoods() {
            this.$emit("search", this._searchLine)
        },

        ShowCart() {
            this.$emit("cart")
        }
    }
});

// Компонент списка товаров
Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="good in goods" v-bind:key="good.product_id" :good="good"></goods-item>
        </div>
    `
});

// Компонент карточки товара
Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item text-center">
            <div class="g-img"><img :src="'img/' + good.image"/></div>
            <h3 class="g-name">{{ good.product_name }}</h3>
            <p class="g-descr">{{ good.product_descr}}</p>
            <p class="g-price">$ {{ good.price }}</p>
            <p><button class="addcart" type="button" @click="AddToCart" v-bind:id="good.id_product">Добавить в корзину</button></p>
        </div>
    `
    ,

    methods: {
        AddToCart() {
            eventBus.$emit("_addtocart", this.good.id_product);
        }
    }
});

// Компонет корзины
Vue.component('cart', {
    props: ['goods'],
    template: `
    <div class="cart-list">
        <cart-item v-for="good in goods" v-bind:key="good.product_id" :good="good"></cart-item>
    </div>
    `
});

// Компонент элемента корзины
Vue.component('cart-item', {
    props: ['good'],
    template: `
    <div class="cart-item">
        <h3 class="g-name">{{ good.product_name }}</h3>
        <p class="g-price">$ {{ good.price }}</p>
    </div>
               
    `
});

// Компонент сообщения о том что нет данных или корзина пуста
Vue.component('nodata-msg', {
    props: ['msg'],
    template: `
        <div class="nodata">{{ msg }}</div>
    `
});
//=======================================   VUE.JS компоненты  =======================================
	
const API_URL = 'https://raw.githubusercontent.com/DiMoisha/catalog/a45dfb1ab160b462a00cda8da6de116c5b99681e';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartGoods: [],
        searchLine: '',
        isVisibleCart: false,
        isNoConnect: true
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
                        this.isNoConnect = true;
                        callback([]);
                        return;
                    } else {
                        callback(xhr.response);
                    }
                } else {
                    this.isNoConnect = true;
                }
            }

            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onloadend = function () {
                if (xhr.status == 404 || xhr.status == 0) {
                    console.log("Запрос на получение данных не удался");
                    this.isNoConnect = true;
                }
            }

            xhr.send();
        },

        FilterGoods(_searchLine) {
            if (_searchLine) {
                this.searchLine = _searchLine;
            } else {
                this.searchLine = "";
            }

            const regex = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter((x) => regex.test(x.product_name));
        },

        ShowCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        AddToCart(id) {
            if(!this.cartGoods.find(x => x.id_product == id)) {
                this.cartGoods.push(this.goods.find(x => x.id_product == id));
            }
        }

    },

    created(){
        eventBus.$on("_addtocart", (id)=>{
            this.AddToCart(id);
        });
    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalog.json`, (goods) => {
            this.isNoConnect = false;
            this.goods = goods;
            for (let i = 0; i < this.goods.length; i++) {
                if (!this.goods[i].image) {
                    this.goods[i].image = 'default.png';
                }
            }

            this.filteredGoods = this.goods;
        });
    }
});
