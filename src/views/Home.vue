<template>
  <div class="home">
    <Top />
    <Offer />
    <Product />
  </div>
</template>

<script>
import Top from '../components/Top.vue'
import Offer from '../components/Offer.vue'
import Product from '../components/Product.vue'

export default {
  name: 'Home',
  components: {
    Top,
    Offer,
    Product
  }
}
</script>
