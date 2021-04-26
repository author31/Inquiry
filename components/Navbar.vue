<template>
  <nav>
      <div class="bg-gray-200 h-16 shadow-md notPrint">
        <div class="grid grid-cols-12 py-3 text-lg">    
          <div class="col-start-2 col-span-3" v-if="userInfo.authenticated"><nuxt-link class="hover:bg-gray-100" to="/">回首頁</nuxt-link></div>
          <div class="col-start-10 col-span-4 xs:col-span-1 xl:col-start-11" v-if="userInfo.authenticated" v-on:click="logout"><button class="hover:bg-gray-100" >登出 {{userInfo.username}}</button></div>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    computed: {
      ...mapGetters({
        userInfo: 'token/getUserInfo'
      })
    },
    methods: {
      logout() {
        this.$store.dispatch('token/logout')
      }
    }
}
</script>

<style>

</style>