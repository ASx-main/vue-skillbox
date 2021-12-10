<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="section-filter-catalog">
      <ProductFiltered :price-from.sync="filterPriceFrom"
                       :price-to.sync="filterPriceTo"
                       :category-id.sync="filterCategoryId"
                       :color-filter.sync="filterColors"
      />
      <section class="catalog">
        <ProductList :products="products"
                     @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"
        />
        <BasePagination
          v-model="currentPage"
          :count="countProducts"
          :per-pages="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>

import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFiltered from '@/components/ProductFiltered.vue';

export default {
  components: {
    ProductFiltered,
    BasePagination,
    ProductList,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      currentPage: 1,
      productsPerPage: 3,
      filterColors: '',
    };
  },
  computed: {
    filtered() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoriesId === this.filterCategoryId);
      }

      if (this.filterColors) {
        filteredProducts = filteredProducts
          .filter((product) => product.colors.includes(this.filterColors));
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.currentPage - 1) * this.productsPerPage;
      return this.filtered.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filtered.length;
    },
  },
};
</script>
