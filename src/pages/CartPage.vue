<template>
  <div>
    <div id="cube-loader"
         v-if="$store.state.loadCart">
      <div class="caption">
        <div class="cube-loader">
          <div class="cube loader-1"></div>
          <div class="cube loader-2"></div>
          <div class="cube loader-4"></div>
          <div class="cube loader-3"></div>
        </div>
      </div>
    </div>
    <div v-else-if="$store.state.loadCartFailed"
         class="failed">
      <h2> Произошла ошибка при загрузке товара.</h2>
      <button @click.prevent="loadCart"
              class="btn-failed">
        Попробовать еще раз
      </button>
    </div>
    <main v-else class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
              Каталог
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Корзина
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Корзина
        </h1>
        <span v-if="countProduct" class="content__info">
        {{ countProduct }}
        </span>
        <h3 v-else>
          Корзина пуста! Добавьте товары из каталога
          <router-link tag="button"
                       :to="{name: 'main'}"
                       class="cart__button button button--primery zero-products"
          >
            В каталог
          </router-link>
        </h3>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem v-for="item in products" :key="item.productId"
                        :item="item"/>
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ totalPrice | numberFormat }}₽</span>
            </p>

            <router-link tag="button"
                         :disabled="$store.state.cartProduct.length === 0"
                         :to="{name: 'order'}"
                         class="cart__button button button--primery"
                         type="submit">
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </main>

  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import numberFormat from '../helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      countProduct: 'cartCountProduct',
    }),
  },
  methods: {
    ...mapActions({
      load: 'loadCart',
    }),
  },
  created() {
    this.load();
  },
};
</script>

<style lang="stylus" scoped>
html, body {
  height 100%
}

#cube-loader {
  display flex
  justify-content center
  margin 200px auto
  height 100%
  width 100%

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
.zero-products {
  width 20%
  margin 20px 30px
}
</style>
