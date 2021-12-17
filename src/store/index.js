import Vue from 'vue';
import Vuex from 'vuex';
import products from '../data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProduct: [
      {
        productId: 1,
        amount: 1,
      },
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
    addProduct(state, productId) {
      const item = state.cartProduct
        .find((itemProduct) => itemProduct.productId === productId);
      if (item) {
        item.amount += 1;
      }
    },
    takeProduct(state, productId) {
      const item = state.cartProduct
        .find((itemProduct) => itemProduct.productId === productId);
      if (item.amount > 1) {
        item.amount -= 1;
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProduct
        .find((itemProduct) => itemProduct.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProduct = state.cartProduct
        .filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProduct.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartCountProduct(state, getters) {
      if (getters.cartDetailProducts.length === 1) return `${getters.cartDetailProducts.length} товар`;
      if (getters.cartDetailProducts.length > 1 && getters.cartDetailProducts.length < 5) {
        return `${getters.cartDetailProducts.length} товара`;
      }
      return `${getters.cartDetailProducts.length} товаров`;
    },
  },
});
