<template>
    <div class="flex-box center">
        <form action="#" class="incart">
            <div class="incart__items">
                <CartItem v-bind:key="good.id" v-bind:good="good" v-for="good of cart" />

                <!-- <div class="incart__item1 incart__item">
                    <a href="product.html"><img src="img/products/item3.png" alt="photo" class="incart__img"></a>
                    <div class="incart__text">
                        <a href="product.html"><h3 class="incart__product">MANGO PEOPLE<br>T-SHIRT</h3></a>
                        <p>Price:<span class="incart__price"> $300</span></p>
                        <p>Color:<span class="incart__color"> Red</span></p>
                        <p>Size:<span class="incart__size"> XL</span></p>
                        <div class="incart__quantity">
                            <p class="incart__quantity-text">Quantity:</p>
                            <input type="number" class="incart__input" value="2" min="0">
                        </div>
                    </div>
                    <button class="incart__clear"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                        </svg>
                        </button>
                </div>


                <div class="incart__item2 incart__item">
                    <a href="product.html"><img src="img/products/item7.png" alt="photo" class="incart__img"></a>
                    <div class="incart__text">
                        <a href="product.html"><h3 class="incart__product">MANGO PEOPLE<br>T-SHIRT</h3></a>
                        <p>Price:<span class="incart__price"> $300</span></p>
                        <p>Color:<span class="incart__color"> Red</span></p>
                        <p>Size:<span class="incart__size"> XL</span></p>
                        <div class="incart__quantity">
                            <p class="incart__quantity-text">Quantity:</p>
                            <input type="number" class="incart__input" value="2" min="0">
                        </div>
                    </div>
                    <button class="incart__clear"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                        </svg>
                        </button>
                </div> -->


            </div>
            <div class="incart__buttons">
                <button class="cart-button cart-button-left" v-on:click="deleteCart">CLEAR SHOPPING CART</button>
                <button class="cart-button">CONTINUE SHOPPING</button>
            </div>
        </form>
        <form action="#" class="cart-form">
            <div class="adress">
                <h3 class="adress__heading">SHIPPING ADRESS</h3>
                <input type="text" class="adress__input" placeholder="Bangladesh">
                <input type="text" class="adress__input" placeholder="State">
                <input type="text" class="adress__input" placeholder="Postcode / Zip">
                <button class="adress__button">GET A QUOTE</button>
            </div>
            <div class="summ">
                <h4 class="summ__sub">SUB TOTAL <span class="summ__price-sub">${{ cartSum }}</span></h4>
                <h3 class="summ__total">GRAND TOTAL <span class="summ__price-total">${{ cartSum }}</span></h3>
                <hr class="summ__line">
                <button class="summ__button">PROCEED TO CHECKOUT</button>
            </div>
        </form>
    </div>
</template>


<script>
import CartItem from './CartItem.vue'

export default {
    name: 'CartSection',
    components: {
        CartItem
    }
    ,
    computed: {
        cart() {
            return this.$store.getters.getCart
        },

        cartSum() {
            return this.$store.getters.getCart.reduce((acc, good) => acc + (good.quantity*good.price), 0);
        }
    },
     methods: {
        deleteCart() {
            this.$store.dispatch('delCart')
        }

    }
}
</script>