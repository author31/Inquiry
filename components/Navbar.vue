<template>
  <nav>
      <div class="bg-green-400 h-20">
        <div class="container">    
          <ul class="flex justify-end mr-8 pt-5 text-lg font-bold ">
            <li class="hover:bg-gray-100" v-if="!userInfo.authenticated"><nuxt-link to="/login">登入</nuxt-link></li>
            <li class="hover:bg-gray-100" v-if="userInfo.authenticated" ><button v-on:click="logout">登出 {{userInfo.username}}</button></li>
          </ul>
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