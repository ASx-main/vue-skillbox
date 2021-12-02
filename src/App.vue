<template>
  <section class="catalog">
    <ProductList :products="products"/>
      <BasePagination
        v-model="currentPage"
        :count="countProducts"
        :per-pages="productsPerPage"
      />
  </section>
</template>

<script>

import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  components: {
    BasePagination,
    ProductList,
  },
  name: 'App',
  data() {
    return {
      currentPage: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.currentPage - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
