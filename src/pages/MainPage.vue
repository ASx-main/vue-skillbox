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

import axios from 'axios';
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
      productsData: null,
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
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.currentPage}&limit=${this.productsPerPage}`)
        .then((response) => {
          this.productsData = response.data;
        });
    },
  },
  watch: {
    currentPage() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
