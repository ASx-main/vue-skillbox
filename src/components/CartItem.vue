<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image"
           width="120" height="120"
           :alt="item.title">
    </div>
    <h3 class="product__title">
      {{ item.title }}
    </h3>
    <span class="product__code">
                Артикул: {{ item.productId }}
              </span>

    <div class="product__counter form__counter">
      <button type="button"
              aria-label="Убрать один товар"
              @click.prevent="takeProduct()"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="number" min="1" v-model.number="amount" name="count">

      <button type="button"
              aria-label="Добавить один товар"
              @click.prevent="addProduct()"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.price * item.amount) | numberFormat}} ₽
    </b>

    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteToCart(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>

import { mapMutations, mapActions } from 'vuex';
import numberFormat from '../helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(val) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: val,
        });
      },
    },

  },
  methods: {
    deleteToCart(productId) {
      this.deleteProductToCart(productId);
    },
    addProduct() {
      this.$store.dispatch('updateCartProductAmount', {
        productId: this.item.productId,
        amount: this.amount + 1,
      });
    },
    takeProduct() {
      this.$store.dispatch('updateCartProductAmount', {
        productId: this.item.productId,
        amount: this.amount - 1,
      });
    },

    ...mapActions(['deleteProductToCart', 'addTack']),
    ...mapMutations({
      deleteProduct: 'deleteCartProduct',
      addProductToCart: 'addProduct',
      takeProductToCart: 'takeProduct',
    }),
  },
};
</script>
