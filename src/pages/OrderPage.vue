<template>
  <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО"
                          placeholder="Введите ваше полное имя"
                          :error="formError.name"
                          v-model="formData.name"
            />

            <label class="form__label">
              <input class="form__input"
                     v-model="formData.address"
                     type="text"
                     name="address"
                     placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error"
                    v-if="formError.address">{{formError.address}}</span>
            </label>

            <label class="form__label">
              <input class="form__input"
                     v-model="formData.phone"
                     type="tel"
                     name="phone"
                     placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error"
                    v-if="formError.phone">{{formError.phone}}</span>
            </label>

            <label class="form__label">
              <input class="form__input"
                     v-model="formData.email"
                     type="email"
                     name="email"
                     placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error"
                    v-if="formError.email">{{formError.email}}</span>
            </label>

            <BaseFormTextarea title="Комментарии к заказу"
                              placeholder="Введите комментарий"
                              :error="formError.comments"
                              v-model="formData.comments"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio"
                         name="delivery"
                         value="0"
                         checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio"
                         name="delivery"
                         value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio"
                         name="pay"
                         value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio"
                         name="pay"
                         value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order"
                v-for="product in products" :key="product.id">
              <h3>{{ product.title }}</h3>
              <b>{{ product.price | numberFormat }}₽</b>
              <span>Артикул: {{ product.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
              <b>
                {{ countProduct }}
              </b>
              товара на сумму
              <b>
                {{ totalPriceDelivery | numberFormat }}₽
              </b>
            </p>
          </div>

          <button class="cart__button button button--primery"
                  type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '../helpers/numberFormat';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      priceDelivery: 500,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      countProduct: 'cartCountProduct',
      totalPrice: 'cartTotalPrice',
    }),
    totalPriceDelivery() {
      return this.totalPrice + this.priceDelivery;
    },
  },
  methods: {
    ...mapActions({
      load: 'loadCart',
    }),
  },
  created() {
    this.load();
  },
  components: { BaseFormTextarea, BaseFormText },
};
</script>
