<template>
  <div id="app" v-wechat-title='$route.meta.title' >
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
}
</script>
<style lang="scss">

</style>
