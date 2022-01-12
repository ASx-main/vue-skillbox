<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{countProducts}} товар
      </span>
    </div>
    <div id="cube-loader"
          v-if="productsLoading">
      <div class="caption">
        <div class="cube-loader">
          <div class="cube loader-1"></div>
          <div class="cube loader-2"></div>
          <div class="cube loader-4"></div>
          <div class="cube loader-3"></div>
        </div>
      </div>
    </div>
    <div v-if="productLoadingFailed"
         class="failed">
       <h2>
         Произошла ошибка при загрузке товаров.
       </h2>
      <button @click.prevent="loadProducts"
              class="btn-failed">
        Попробовать еще раз
      </button>
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
      productsLoading: false,
      productLoadingFailed: true,
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
      this.productsLoading = true;
      this.productLoadingFailed = false;
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
          })
          .catch(() => {
            this.productLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 3000);
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

<style scoped lang="stylus">
html, body {
  height 100%
}

#cube-loader {
  height 100%
  width 100%
  position: fixed
& .caption {
    margin 0 auto
  }
.cube-loader {
  width 73px
  height 73px
  margin 0 auto
  margin-top 49px
  position relative
  transform rotateZ(45deg)

& .cube {
    position relative
    transform rotateZ(45deg)
    width 50%
    height 50%
    float left
    transform scale(1.1)
  }
& .cube:before {
    content ""
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(52, 73, 94, 1.0)
    animation cube-loader 2.76s infinite linear both
    transform-origin 100% 100%
  }
& .loader-2 {
    transform scale(1.1) rotateZ(90deg)
  }
& .loader-3 {
    transform scale(1.1) rotateZ(180deg)
  }
& .loader-4 {
    transform scale(1.1) rotateZ(270deg)
  }
& .loader-2:before {
    animation-delay 0.35s
  }
& .loader-3:before {
    animation-delay 0.69s
  }
& .loader-4:before {
    animation-delay 1.04s
  }
}
}

@keyframes cube-loader {
  0%, 10% {
    transform perspective(136px) rotateX(-180deg)
    opacity 0
  }
  25%, 75% {
    transform perspective(136px) rotateX(0deg)
    opacity 1
  }
  90%, 100% {
    transform perspective(136px) rotateY(180deg)
    opacity 0
  }
}

.failed {
  display flex
  justify-content center
  align-items center
  flex-direction column
}

.btn-failed {
  font-size 18px
  font-weight 700
  margin 10px
  padding 15px
  background-color #222222
  color #ffffff
  border 2px solid #9eff00
}

</style>
