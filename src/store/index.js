import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProduct: [],
    cartProductsData: [],
    userAccessKey: null,
    loadCart: false,
    loadCartFailed: false,
    orderInfo: null,
    priceDelivery: null,
  },
  mutations: {
    updatePriceDelivery(state, payload) {
      state.priceDelivery = payload;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProduct = [];
      state.cartProductsData = [];
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
    updateAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProduct = state.cartProductsData.map((item) => {
        const {
          product: { title, id, image: { file: { url } } },
          quantity,
          price,
        } = item;

        return {
          title,
          productId: id,
          amount: quantity,
          image: url,
          price,
        };
      });
    },
    onLoadCart(state) {
      state.loadCart = true;
    },
    offLoadCart(state) {
      state.loadCart = false;
    },
    onLoadCartFailed(state) {
      state.loadCartFailed = true;
    },
  },
  getters: {
    orderTotalPrice(state) {
      return state.orderInfo.basket.items
        .reduce((acc, item) => (item.price * item.quantity) + acc, 0);
    },
    orderCountProduct(state) {
      return state.orderInfo.basket.items
        .reduce((acc, item) => (item.quantity) + acc, 0);
    },
    cartDetailProducts(state) {
      return state.cartProduct;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.price * item.amount) + acc, 0);
    },
    cartCountProduct(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.amount) + acc, 0);
    },

  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      context.commit('onLoadCart');
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('onLoadCartFailed');
        })
        .then(() => {
          context.commit('offLoadCart');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductToCart(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
