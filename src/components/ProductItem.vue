<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
       @click.prevent="$emit('gotoPage' , 'product', '{id: product: id}')">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
              {{product.price}} P
    </span>

    <ul class="colors colors--black">
      <li class="colors__item"
          v-for="color in product.colors"
          :key="color"

      >
        <label class="colors__label">
          <input class="colors__radio sr-only"
                 type="radio"
                 v-model="product.color"
          >
          <span class="colors__value"
                :style="`background-color: ${color};`"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>

export default {
  data() {
    return {
      color: '',
    };
  },
  props: ['product', 'colorFilter'],
};
</script>
