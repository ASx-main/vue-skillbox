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
        <ProductList
          :products="products"
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
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFiltered from '@/components/ProductFiltered.vue';
import { API_BASE_URL } from '@/config';

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
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.currentPage,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColors,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          });
      }, 0);
    },
  },
  watch: {
    currentPage() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColors() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
