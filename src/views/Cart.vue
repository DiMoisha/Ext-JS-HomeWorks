<template>
  <div class="cart">
    <Breadcrumbs />
    <CartSection />
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'
import CartSection from '../components/CartSection.vue'

export default {
    name: 'Cart',
    components: {
        Breadcrumbs,
        CartSection
    }
}
</script>