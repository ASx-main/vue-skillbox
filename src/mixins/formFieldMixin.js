import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  components: { BaseFormField },
};
