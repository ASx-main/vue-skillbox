<template>
  <div class="form__counter">
    <button type="button"
            aria-label="Убрать один товар"
            @click.prevent="decreaseProduct"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="number" min="1" :value="value" @input="handlerInput">

    <button type="button"
            aria-label="Добавить один товар"
            @click.prevent="addProduct"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    decreaseProduct() {
      if (this.value > 1) {
        this.$emit('input', Number(this.value) - 1);
      }
    },
    addProduct() {
      if (this.value) {
        this.$emit('input', Number(this.value) + 1);
      }
    },
    handlerInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
