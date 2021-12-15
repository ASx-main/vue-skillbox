import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProduct: [
      { productId: 1, amount: 2 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProduct
        .find((itemProduct) => itemProduct.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProduct.push({
          productId,
          amount,
        });
      }
    },
  },
});
