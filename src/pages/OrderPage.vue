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
      <div id="cube-loader">
        <div class="caption"
             v-if="loadFormPost">
          <div class="cube-loader">
            <div class="cube loader-1"></div>
            <div class="cube loader-2"></div>
            <div class="cube loader-4"></div>
            <div class="cube loader-3"></div>
          </div>
        </div>
      </div>
    </div>

    <section class="cart"
              v-show="!loadFormPost">
      <form class="cart__form form"
            action="#"
            method="POST"
            @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО"
                          placeholder="Введите ваше полное имя"
                          :error="formError.name"
                          v-model="formData.name"
            />
            <BaseFormText title="Адрес доставки"
                          placeholder="Введите ваш адрес"
                          :error="formError.address"
                          v-model="formData.address"
            />

            <BaseFormText title="Телефон"
                          placeholder="Введите ваш телефон"
                          :error="formError.phone"
                          v-model="formData.phone"
            />
            <BaseFormText title="Email"
                          placeholder="Введите ваш Email"
                          :error="formError.email"
                          v-model="formData.email"
            />

            <BaseFormTextarea title="Комментарии к заказу"
                              placeholder="Введите комментарий"
                              :error="formError.comment"
                              v-model="formData.comment"
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
        <div class="cart__error form__error-block"
              v-if="errorMessage"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import axios from 'axios';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '../helpers/numberFormat';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      errorMessage: '',
      loadFormPost: false,
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
    ...mapState({
      priceDelivery: (state) => state.priceDelivery,
    }),
    totalPriceDelivery() {
      return this.totalPrice + this.priceDelivery;
    },
  },
  methods: {
    ...mapActions({
      load: 'loadCart',
    }),
    order() {
      this.formError = {};
      this.errorMessage = '';
      this.loadFormPost = true;

      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        },
        {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          this.loadFormPost = false;
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.errorMessage = error.response.data.error.message;
        });
    },
  },
  created() {
    this.load();
  },
  components: { BaseFormTextarea, BaseFormText },
};
</script>

<style lang="stylus" scoped>
html, body {
  height 100%
}

#cube-loader {
  display flex
  justify-content center
  margin 0 auto
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
</style>
