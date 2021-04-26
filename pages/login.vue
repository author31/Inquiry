<template>
  <div class="flex justify-center">
    <div class="bg-gray-300 shadow-lg h-64 mt-32 lg:w-3/12">
      <div class="flex justify-center">
        <h1 class="w-48 text-center font-bold pt-8"> 登入 </h1>
      </div>
      <div class="flex justify-center items-end h-32">
        <button class="bg-green-900 p-2 rounded-full hover:bg-gray-50 mx-4" @click="loginWith">
          <div class="grid grid-cols-5">
            <i class="fab fa-google px-2 text-red-400 mt-1 col-start-1"></i>
            <p class="col-start-2 col-span-4 text-white mr-2 hover:text-black">登入你的 GOOGLE 帳號</p>
          </div>
        </button>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: "router-auth",
  methods: {  
      loginWith(){
          this.$store.dispatch('token/login')
      }
  },
  computed: {
    ...mapGetters({
      userInfo: 'token/getUserInfo'
    }),
  }
}   
</script>

<style>
body {
  background-color: #EFFDF5;
}

</style>