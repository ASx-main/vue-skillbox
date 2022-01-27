<template>
  <main v-if="orderInfo" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $route.params.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
            Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order"
                v-for="product in productsOrder"
                :key="product.id"
            >
              <h3>{{ product.product.title }}</h3>
              <b>{{product.product.price | numberFormat }}₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ priceDelivery }} ₽</b></p>
            <p>Итого: <b>{{ countProduct }}</b>
              товара на сумму <b>{{ totalPriceDelivery | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import { mapGetters, mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      totalPrice: 'orderTotalPrice',
      countOrderProducts: 'orderCountProduct',
    }),
    ...mapState({
      orderInfo: (state) => state.orderInfo,
      priceDelivery: (state) => state.priceDelivery,
    }),
    countProduct() {
      return this.countOrderProducts;
    },
    totalPriceDelivery() {
      return this.totalPrice + this.priceDelivery;
    },
    productsOrder() {
      return this.orderInfo.basket.items;
    },
  },
  created() {
    if (this.orderInfo && this.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>
