<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         href="#"
         @click.prevent="arrowLeftPagination(currentPage)"
         :class="{'pagination__link--disabled' : currentPage === 1}"
         aria-label="Предыдущая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page in pages" :key="page">
      <a class="pagination__link"
         :class="{'pagination__link--current': page === currentPage}"
         @click.prevent="pagination(page)"
         href="#"
      >
        {{ page }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         href="#" aria-label="Следующая страница"
         @click.prevent="arrowRightPagination(currentPage)"
         :class="{'pagination__link--disabled' : currentPage === pages}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'currentPage',
    event: 'paginate',
  },
  props: ['currentPage', 'count', 'perPages'],
  methods: {
    pagination(page) {
      this.$emit('paginate', page);
    },
    arrowLeftPagination(page) {
      if (page !== 1) {
        this.$emit('paginate', page - 1);
      }
    },
    arrowRightPagination(page) {
      if (page !== this.pages) {
        this.$emit('paginate', page + 1);
      }
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPages);
    },
  },
};
</script>
