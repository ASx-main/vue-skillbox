<template>
  <router-link class="header__cart"
               :to="{ name: 'cart'}"
               href="#"
               aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProduct.length }}
    </span>
  </router-link>
</template>
