import { createStore } from 'vuex'


class GoodInCart {
  constructor(good, quantity = 1, size = "XL", color = "red") {
    this.id = good.id,
    this.image = good.image,
    this.product_name = good.product_name,
    this.product_desc = good.product_desc,
    this.price = good.price,
    this.quantity = quantity,
    this.size = size,
    this.color = color
  }
}

export default createStore({
  state: {
    catalog: [],
    cart: [],
    search: ''
  },
  getters: {
    getCatalog(state) {
      return state.catalog
    },
    getCart(state) {
      return state.cart
    },
    getSearch(state){
      return state.search
    }
  },
  mutations: {
    setSearch(state, search) {
      state.search = search
    },

    setCatalog(state, payload) { state.catalog = [...state.catalog, ...payload] },
    setCart(state, payload) { state.cart = [...state.cart, ...payload] },
    addToCart(state, goodId) {
      const goodInCart = state.cart.find((good) => good.id === goodId);
      
      if(goodInCart) {
        goodInCart.quantity++;
      } else {
        const good = state.catalog.find((good) => good.id === goodId);
        state.cart.push(new GoodInCart(good));
      }
    },
    
    removeFromCart(state, goodId) {
      state.cart = state.cart.filter((x) => x.id !== goodId)
    },

    changeCart(state, goodId, value) {
      const goodInCart = state.cart.find((x) => x.id === goodId);
      
      if(goodInCart) {
        goodInCart.quantity = value;
      } 
    },

    deleteCart(state) {
      state.cart = []
    },


  },
  actions: {
    loadCatalog({commit}) {
      return fetch('api/good')
        .then((response) => {
          return response.json()
        })
        .then((goodList) => {
          commit('setCatalog', goodList)
        })
    },

    loadCart({commit}) {
      return fetch('api/cart')
        .then((response) => {
          return response.json()
        })
        .then((goodList) => {
          commit('setCart', goodList)
        })
    },

    loadToCart({commit, dispatch}, good) {
      return fetch('api/cart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          commit('addToCart', good.id)
          dispatch('setStat', { type: 'add', id: good.id})
          console.log(good)
        })
     },

     remFromCart({commit, dispatch}, good) {
      return fetch('api/removecart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          commit('removeFromCart', good.id)
          dispatch('setStat', { type: 'remove', id: good.id})
          console.log(good)
        })
     },

     chCart({commit, dispatch}, good) {
      return fetch('api/changecart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          commit('changeCart', good.id, good.quantity)
          dispatch('setStat', { type: 'change', id: good.id})
          console.log(good)
        })
     },

     delCart({commit, dispatch}) {
      return fetch('api/delcart', {method: 'POST', headers:{'Content-Type':'application/json'}})
        .then((response) => {
          commit('deleteCart')
          dispatch('setStat', { type: 'deleteAllCart', id: -1})
          console.log(good)
        })
     },

    setStat({commit}, stat) {
      return fetch('api/stat', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(stat)})
        .then((response) => {
          console.log(stat)
        })
        
    }
  }
})




