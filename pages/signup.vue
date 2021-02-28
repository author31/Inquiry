<template>
    <div class="flex justify-center">
        <div class="bg-gray-200 shadow-md h-64 mt-32 lg:w-3/12 px-4 py-2">
            <h1 class="font-bold mb-2">輸入資料</h1>
            <div class="grid md:grid-cols-5">
                <label class="md:col-start-1 md:col-span-2" for="username">姓名:</label> 
                <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" name="username" v-model="userInfo.username"><br/>

                <label class="md:col-start-1 md:col-span-2" for="deparment">科系:</label>
                <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" name="deparment" v-model="userInfo.department"><br/>

                <label class="md:col-start-1 md:col-span-2" for="grade">班級:</label>
                <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" name="grade" v-model="userInfo.grade"><br/>
                
            </div>
            <button class="bg-red-400 px-2 " @click="signUp"> 註冊 </button>    
            
        </div>  
  </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                username: "",
                department: "",
                grade: ""
            }
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('token/signUp', this.userInfo)
        }
    },

}
</script>

<style>

</style>