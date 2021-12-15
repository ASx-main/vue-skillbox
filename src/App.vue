<template>
  <div>
    <BaseHeader/>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>

import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  components: { BaseFooter, BaseHeader },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

.section-filter-catalog {
  display: flex;
}
</style>
