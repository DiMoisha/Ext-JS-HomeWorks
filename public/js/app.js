"use strict";

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
        <p><button class="removefcart" type="button" @click="RemoveFromCart" v-bind:id="good.id_product">Удалить из корзины</button></p>
    </div>
               
    `
    ,

    methods: {
        RemoveFromCart() {
            eventBus.$emit("_removefromcart", this.good.id_product);
        }
    }
});

// Компонент сообщения о том что нет данных или корзина пуста
Vue.component('nodata-msg', {
    props: ['msg'],
    template: `
        <div class="nodata">{{ msg }}</div>
    `
});
//=======================================   VUE.JS компоненты  =======================================

const app = new Vue({
    el: '#app',
    data() {
        return {
            goods: [],
            filteredGoods: [],
            cartGoods: [],
            searchLine: '',
            isVisibleCart: false
        }
    },


    methods: {
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
            if (!this.cartGoods.find(x => x.id_product == id)) {
                let good = this.goods.find(x => x.id_product == id);
                this.cartGoods.push(good);
                fetch('/addToCart', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(good)
                })
            }
        },

        RemoveFromCart(id) {
            let good = this.cartGoods.find(x => x.id_product == id)
            if (good) {
                this.cartGoods = this.cartGoods.filter(item => item.id_product !== good.id_product);
                fetch('/removeFromCart', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(good)
                })
            }
        },

        CloseCart() {
            this.isVisibleCart = false;
        }
    },

    created() {
        eventBus.$on("_addtocart", (id) => {
            this.AddToCart(id);
        });

        eventBus.$on("_removefromcart", (id) => {
            this.RemoveFromCart(id);
        });

    },

    mounted() {
        fetch('/catalog')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                //this.catalog = data;
                this.goods = data;

                for (let i = 0; i < this.goods.length; i++) {
                    if (!this.goods[i].image) {
                        this.goods[i].image = 'default.png';
                    }
                }

                this.filteredGoods = this.goods;
            })

        fetch('/cart')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.cartGoods = data;
            })
    }
});