<template>
  <div>
    <div id="cube-loader"
         v-if="productLoad">
      <div class="caption">
        <div class="cube-loader">
          <div class="cube loader-1"></div>
          <div class="cube loader-2"></div>
          <div class="cube loader-4"></div>
          <div class="cube loader-3"></div>
        </div>
      </div>
    </div>
    <div v-else-if="productLoadFailed"
          class="failed">
      <h2> Произошла ошибка при загрузке товара.</h2>
      <button @click.prevent="loadingProduct"
              class="btn-failed">
        Попробовать еще раз
      </button>
    </div>
    <main v-else class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link"
                         :to="{ name: 'main' }"
            >
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link"
                         :to="{ name: 'main' }"
            >
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570"
                 height="570"
                 :src="product.image.file.url"
                 :alt="product.title"
            >
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item"
                      v-for="color in colors"
                      :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only"
                             type="radio"
                             name="color-item"
                             :value="color.id"
                      >
                      <span class="colors__value"
                            :style="`background-color: ${color.code};`"
                      >
                    </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only"
                             type="radio"
                             name="sizes-item"
                             value="32"
                      >
                      <span class="sizes__value">
                      32gb
                    </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only"
                             type="radio"
                             name="sizes-item"
                             value="64"
                      >
                      <span class="sizes__value">
                      64gb
                    </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only"
                             type="radio"
                             name="sizes-item"
                             value="128"
                             checked=""
                      >
                      <span class="sizes__value">
                      128gb
                    </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">

                <ProductAddToCart v-model="productAmount"/>

                <button class="button button--primery" type="submit">
                  В корзину
                </button>
              </div>

            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>

            <a href="#">
              Все характеристики
            </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который
              позволяет оптимизировать свои велотренировки,
              сделав их максимально эффективными. Wahoo ELEMNT
              BOLT GPS синхронизируется с датчиками по ANT+,
              объединяя полученную с них информацию. Данные
              отображаются на дисплее, а также сохраняются на смартфоне.
              При этом на мобильное устройство можно установить
              как фирменное приложение, так и различные приложения
              сторонних разработчиков. Велокомпьютер точно отслеживает
              местоположение, принимая сигнал с целого комплекса
              спутников. Эта информация позволяет смотреть уже
              преодоленные маршруты и планировать новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
              Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
              что не превышает габариты смартфона. Корпус гаджета выполнен
              из черного пластика. На обращенной к пользователю
              стороне расположен дисплей диагональю 56 мм. На дисплей
              выводятся координаты и скорость, а также полученная
              со смартфона и синхронизированных датчиков информация:
              интенсивность, скорость вращения педалей, пульс и т.д.
              (датчики не входят в комплект поставки). Корпус велокомпьютера
              имеет степень защиты от влаги IPX7.
              Это означает, что устройство не боится пыли, а также выдерживает
              кратковременное (до 30 минут) погружение
              в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>

</template>

<script>

import axios from 'axios';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductAddToCart from '@/components/ProductAddToCart.vue';
import { API_BASE_URL } from '@/config';

export default {
  components: { ProductAddToCart },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoad: false,
      productLoadFailed: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.productData.colors;
    },
    product() {
      return this.productData ? this.productData : {};
    },
    category() {
      return this.productData.category;
    },
  },
  watch: {
    productAmount(val) {
      const product = {
        productId: this.product.id,
        amount: val,
      };
      this.$store.commit('addProduct', product);
    },
    '$route.params.id': {
      handler() {
        this.loadingProduct();
      },
      immediate: true,
    },
  },

  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        {
          productId: this.product.id,
          amount: this.productAmount,
        },
      );
    },
    loadingProduct() {
      this.productLoad = true;
      this.productLoadFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => {
            this.productData = response.data;
          })
          .catch(() => {
            this.productLoadFailed = true;
          })
          .then(() => {
            this.productLoad = false;
          });
      }, 2000);
    },
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
</style>
